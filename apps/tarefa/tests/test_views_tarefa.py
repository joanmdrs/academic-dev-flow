from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.tarefa.models import Tarefa, IntervaloTempo, CategoriaTarefa
from django.contrib.auth.models import Group

import django
django.setup()

class TarefaViewsTest(APITestCase):
    def setUp(self):
        # Cria um usuário para autenticação
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.projeto = Projeto.objects.create(
            nome="Projeto de Exemplo", 
            data_inicio='2024-08-17', 
            data_termino='2024-08-30'
        )
        
        self.grupo = Group.objects.create(name='TestGroup')

        self.usuario = Usuario.objects.create(
            username="membro.teste@email.com",
            password="senha",
        )
        
        self.membro = Membro.objects.create(
            nome="Membro de teste", 
            data_nascimento='2000-12-11', 
            email='membro.teste@email.com',
            usuario=self.usuario,
            grupo=self.grupo
        )
        
        self.membro_projeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
                
        self.iteracao = Iteracao.objects.create(
            nome="Iteração Teste", data_inicio='2024-08-01', data_termino='2024-08-30')
        
        self.categoria = CategoriaTarefa.objects.create(nome="Categoria de teste", cor="#00BFFF")
                
        self.tarefa = Tarefa.objects.create(
            nome='Tarefa Teste',
            descricao="Descrição da tarefa",
            data_inicio="2024-08-01",
            data_termino="2024-08-05",
            status="pendente",
            projeto=self.projeto,
            iteracao=self.iteracao,
            categoria=self.categoria
        )

        self.tarefa.membros.add(self.membro_projeto)
        
        self.dados = {
            'nome': 'Nova Tarefa',
            'descricao': 'Descrição da nova tarefa',
            'status': 'andamento',
            'categoria': self.categoria.id,
            'projeto': self.projeto.id,
            'iteracao': self.iteracao.id,
            'membros': [self.membro_projeto.id]
        }        
        
        ### Urls 
        
        self.cadastrar_tarefa_url = reverse('tarefa:cadastrar_tarefa')
        self.atualizar_tarefa_url = reverse('tarefa:atualizar_tarefa')
        self.atualizar_status_tarefa_url = reverse('tarefa:atualizar_status_tarefa')
        self.buscar_tarefa_pelo_id_url = reverse('tarefa:buscar_tarefa_pelo_id')
        self.buscar_tarefa_pelo_nome_e_pelo_projeto = reverse('tarefa:buscar_tarefas_pelo_nome_e_pelo_projeto')
        self.listar_tarefas_url = reverse('tarefa:listar_tarefas')
        self.listar_tarefas_por_projeto = reverse('tarefa:listar_tarefas_por_projeto')
        self.listar_tarefas_por_iteracao = reverse('tarefa:listar_tarefas_por_iteracao')
        self.listar_tarefas_dos_projetos_do_membro = reverse('tarefa:listar_tarefas_dos_projetos_do_membro')
        self.filtrar_tarefas_por_projeto_e_por_membro_url = reverse('tarefa:filtrar_por_projeto_e_por_membro')
        self.excluir_tarefas_url = reverse('tarefa:excluir_tarefas')
        

    def test_cadastrar_tarefa_dados_validos(self):
        data = {
            'nome': 'Nova Tarefa',
            'descricao': 'Descrição da nova tarefa',
            'status': 'andamento',
            'categoria': self.categoria.id,
            'projeto': self.projeto.id,
            'iteracao': self.iteracao.id,
            'membros': [self.membro_projeto.id]
        }

        response = self.client.post(self.cadastrar_tarefa_url, data, format='json')   
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tarefa.objects.count(), 2)
    
    def test_cadastrar_tarefa_usuario_nao_autenticado(self):
        self.client.logout()
        data = {
            'nome': 'Nova Tarefa',
            'descricao': 'Descrição da nova tarefa',
            'status': 'andamento',
            'categoria': self.categoria.id,
            'projeto': 00000,
            'iteracao': self.iteracao.id,
            'membros': [self.membro_projeto.id]
        }
        response = self.client.post(self.cadastrar_tarefa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_cadastrar_tarefa_projeto_inexistente(self):
        data = {
            'nome': 'Nova Tarefa',
            'descricao': 'Descrição da nova tarefa',
            'status': 'andamento',
            'projeto': None,
            'categoria': self.categoria.id,
            'iteracao': self.iteracao.id,
            'membros': [self.membro_projeto.id]
        }
        response = self.client.post(self.cadastrar_tarefa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_cadastrar_tarefa_ausencia_campo_nome(self):
        data = {
            'nome': None,
            'descricao': 'Descrição da nova tarefa',
            'status': 'andamento',
            'projeto': self.projeto.id,
            'categoria': self.categoria.id,
            'iteracao': self.iteracao.id,
            'membros': [self.membro_projeto.id]
        }
        response = self.client.post(self.cadastrar_tarefa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(
            response.data["error"],
            "{'nome': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}"
        )
        
    def test_atualizar_tarefa_dados_validos(self):
        """Teste de atualização bem-sucedida"""
        data = {
            "nome": "Tarefa Atualizada",
            "descricao": "Descrição atualizada",
        }
        response = self.client.patch(f"{self.atualizar_tarefa_url}?id_tarefa={self.tarefa.id}", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.tarefa.refresh_from_db()
        self.assertEqual(self.tarefa.nome, "Tarefa Atualizada")
        self.assertEqual(self.tarefa.descricao, "Descrição atualizada")

    def test_atualizar_tarefa_id_nao_fornecido(self):
        """Teste quando o ID da tarefa não é fornecido"""
        data = {"nome": "Nova Tarefa"}
        response = self.client.patch(self.atualizar_tarefa_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "O ID da tarefa não foi fornecido")
        
    def test_atualizar_tarefa_tarefa_nao_encontrada(self):
        """Teste quando a tarefa não é encontrada"""
        data = {"nome": "Nova Tarefa"}
        response = self.client.patch(f"{self.atualizar_tarefa_url}?id_tarefa=9999", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Tarefa não encontrada")
        
    def test_atualizar_tarefa_erro_validacao_serializer(self):
        """Teste de erro de validação do serializer"""
        data = {"status": "invalido"}  # Status inválido
        response = self.client.patch(f"{self.atualizar_tarefa_url}?id_tarefa={self.tarefa.id}", data, format="json")
        
        # Verifica o código de status
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)        
        self.assertEqual(
            response.data["error"],
            "{'status': [ErrorDetail(string='\"invalido\" não é um escolha válido.', code='invalid_choice')]}"
        )
        
    def test_atualizar_status_tarefa_dados_validos(self):
        """Teste para atualizar o status de uma tarefa com sucesso"""
        data = {"status": "concluida"}
        response = self.client.patch(f"{self.atualizar_status_tarefa_url}?id_tarefa={self.tarefa.id}", data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "concluida")

    def test_atualizar_status_tarefa_ausencia_de_id_e_status(self):
        """Teste para ausência de ID e status"""
        response = self.client.patch(self.atualizar_status_tarefa_url, {}, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "O ID da tarefa e o status não foram fornecidos !")

    def test_atualizar_status_tarefa_tarefa_nao_encontrada(self):
        """Teste para ID de tarefa inexistente"""
        data = {"status": "concluida"}
        response = self.client.patch(f"{self.atualizar_status_tarefa_url}?id_tarefa=9999", data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data["error"], "Tarefa matching query does not exist.")

    def test_atualizar_status_tarefa_erro_validacao_status_invalido(self):
        """Teste para erro de validação com status inválido"""
        data = {"status": "invalido"}  # Valor inválido
        response = self.client.patch(
            f"{self.atualizar_status_tarefa_url}?id_tarefa={self.tarefa.id}", 
            data,
            format="json")
        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(
            response.data["error"],
            "{'status': [ErrorDetail(string='\"invalido\" não é um escolha válido.', code='invalid_choice')]}"
        )
        
    def test_view_buscar_tarefa_pelo_id_dados_validos(self):
        """Teste para buscar uma tarefa pelo ID com sucesso"""
        response = self.client.get(f"{self.buscar_tarefa_pelo_id_url}?id_tarefa={self.tarefa.id}")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nome"], self.tarefa.nome)
        self.assertEqual(response.data["descricao"], self.tarefa.descricao)
        self.assertEqual(response.data["status"], self.tarefa.status)

    def test_view_buscar_tarefa_pelo_id_para_id_nao_fornecido(self):
        """Teste para ausência de ID da tarefa ao realizar a busca"""
        response = self.client.get(self.buscar_tarefa_pelo_id_url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "O ID da tarefa não foi fornecido")

    def test_view_buscar_tarefa_pelo_id_para_tarefa_nao_encontrada(self):
        """Teste para ID de tarefa inexistente"""
        response = self.client.get(f"{self.buscar_tarefa_pelo_id_url}?id_tarefa=9999")
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Tarefa não encontrada")

    def test_buscar_tarefas_pelo_nome_e_pelo_projeto_caso_sem_filtros(self):
        """Teste para a view de buscar tarefas pelo nome e pelo projeto, sem filtros"""
        response = self.client.get(self.buscar_tarefa_pelo_nome_e_pelo_projeto)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
    def test_buscar_tarefas_pelo_nome_e_pelo_projeto_nome_fornecido(self):
        """Teste para a view de buscar tarefas pelo nome e pelo projeto, fornecendo o nome"""
        response = self.client.get(self.buscar_tarefa_pelo_nome_e_pelo_projeto, {'nome_tarefa': 'Tarefa'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Tarefa Teste')

    def test_buscar_tarefas_pelo_nome_e_pelo_projeto_projeto_fornecido(self):
        """Teste para a view de buscar tarefas pelo nome e pelo projeto, fornecendo o projeto"""
        response = self.client.get(self.buscar_tarefa_pelo_nome_e_pelo_projeto, {'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_buscar_tarefas_pelo_nome_e_pelo_projeto_nome_e_projeto_fornecido(self):
        """Teste para a view de buscar tarefas pelo nome e pelo projeto, fornecendo o nome da tarefa e o id do projeto"""
        response = self.client.get(self.buscar_tarefa_pelo_nome_e_pelo_projeto, {'nome_tarefa': 'Tarefa', 'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Tarefa Teste')

    def test_buscar_tarefas_pelo_nome_e_pelo_projeto_sem_resultados(self):
        """Teste para a view de buscar tarefas pelo nome e pelo projeto, sem resultados"""
        response = self.client.get(self.buscar_tarefa_pelo_nome_e_pelo_projeto, {'nome_tarefa': 'Inexistente'})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_listar_tarefas_com_usuario_autenticado(self):
        """Teste para a view de listar tarefas com usuário autenticado"""
        response = self.client.get(self.listar_tarefas_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], "Tarefa Teste")
    
    def test_listar_tarefas_com_usuario_nao_autenticado(self):
        """Teste para a view de listar tarefas com usuário autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_tarefas_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_tarefas_por_projeto_id_projeto_nao_fornecido(self):
        """Testa se retorna erro quando o id_projeto não for fornecido"""
        response = self.client.get(self.listar_tarefas_por_projeto)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID do projeto não foi fornecido.'})
    
    def test_listar_tarefas_por_projeto_ausencia_de_tarefas(self):
        """Testa se retorna uma lista vazia quando o projeto não tem tarefas"""
        projeto_sem_tarefas = Projeto.objects.create(
            nome="Projeto de Exemplo", 
            data_inicio='2024-08-17', 
            data_termino='2024-08-30'
        )
        response = self.client.get(f'{self.listar_tarefas_por_projeto}?id_projeto={projeto_sem_tarefas.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
    
    def test_listar_tarefas_por_projeto_com_tarefas_para_o_projeto(self):
        """Testa se retorna as tarefas associadas ao projeto"""
        response = self.client.get(f'{self.listar_tarefas_por_projeto}?id_projeto={self.projeto.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
        
    def test_listar_tarefas_por_projeto_tratamento_de_erro(self):
        """Testa se a view lida com exceções corretamente"""
        # Vamos forçar um erro de servidor passando um id_projeto inválido
        response = self.client.get(f'{self.listar_tarefas_por_projeto}?id_projeto=invalid_id')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)
        
    def test_listar_tarefas_por_iteracao_id_iteracao_nao_fornecido(self):
        """Testa se retorna erro quando o id_iteracao não for fornecido"""
        response = self.client.get(self.listar_tarefas_por_iteracao)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID da iteração não foi fornecido'})
        
    def test_listar_tarefas_por_iteracao_sem_tarefas_para_a_iteracao(self):
        """Testa se retorna uma lista vazia quando a iteração não tem tarefas"""
        # Criando uma iteração sem tarefas
        iteracao_sem_tarefas = Iteracao.objects.create(
            nome="Iteração Teste", data_inicio='2024-08-01', data_termino='2024-08-30')
        
        response = self.client.get(f'{self.listar_tarefas_por_iteracao}?id_iteracao={iteracao_sem_tarefas.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_listar_tarefas_por_iteracao_com_tarefas_para_a_iteracao(self):
        """Testa se retorna as tarefas associadas à iteração"""
        response = self.client.get(f'{self.listar_tarefas_por_iteracao}?id_iteracao={self.iteracao.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
        
    def test_listar_tarefas_dos_projetos_do_membro_membro_com_projetos(self):
        # Testa o caso em que o membro tem projetos e tarefas
        response = self.client.get(self.listar_tarefas_dos_projetos_do_membro, {'id_membro': self.membro.id})
        
        # Verifica se o status da resposta é 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verifica se as tarefas estão presentes na resposta
        self.assertEqual(len(response.data), 1)  # Espera-se 2 tarefas  
        
    def test_listar_tarefas_dos_projetos_do_membro_membro_sem_projetos(self):
        # Cria um outro membro que não está associado a nenhum projeto
        membro_sem_projeto = Membro.objects.create(nome='Membro Sem Projeto', email='semprojeto@teste.com')
        
        # Testa o caso em que o membro não tem projetos
        response = self.client.get(self.listar_tarefas_dos_projetos_do_membro, {'id_membro': membro_sem_projeto.id})
        
        # Verifica se o status da resposta é 200 OK e a mensagem correta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'O membro não está vinculado a nenhum projeto')
        self.assertEqual(response.data['code'], 'MEMBRO_SEM_PROJETO')
        
    def test_listar_tarefas_dos_projetos_do_membro_parametro_id_membro_ausente(self):
        # Testa o caso em que o parâmetro 'id_membro' não é fornecido
        response = self.client.get(self.listar_tarefas_dos_projetos_do_membro)
        
        # Verifica se o status da resposta é 400 Bad Request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do membro não foi fornecido!')

    def test_filtrar_tarefas_por_membro(self):
        # Testa o filtro quando apenas id_membro é fornecido
        response = self.client.get(self.filtrar_tarefas_por_projeto_e_por_membro_url, {'id_membro': self.membro.id})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Espera-se 3 tarefas
        self.assertEqual(response.data[0]['nome'], 'Tarefa Teste')
        
    def test_filtrar_tarefas_por_projeto(self):
        # Testa o filtro quando apenas id_projeto é fornecido
        response = self.client.get(self.filtrar_tarefas_por_projeto_e_por_membro_url, {'id_projeto': self.projeto.id})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Espera-se 2 tarefas no projeto 1
        self.assertEqual(response.data[0]['nome'], 'Tarefa Teste')
        
    def test_filtrar_tarefas_por_membro_e_projeto(self):
        # Testa o filtro quando ambos id_membro e id_projeto são fornecidos
        response = self.client.get(
            self.filtrar_tarefas_por_projeto_e_por_membro_url, 
            {'id_membro': self.membro.id, 'id_projeto': self.projeto.id})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Espera-se 2 tarefas no projeto 1 associadas ao membro
        self.assertEqual(response.data[0]['nome'], 'Tarefa Teste')

    def test_membro_sem_projeto_no_projeto(self):
        # Testa o caso em que o membro não está vinculado ao projeto informado        
        self.outro_usuario = Usuario.objects.create(
            username="usuario.teste@email.com",
            password="senha",
        )
        
        self.outro_membro = Membro.objects.create(
            nome="Membro de teste", 
            data_nascimento='2000-12-11', 
            email='membro.teste@email.com',
            usuario=self.outro_usuario,
            grupo=self.grupo
        )
        
        response = self.client.get(self.filtrar_tarefas_por_projeto_e_por_membro_url, {'id_membro': self.outro_membro.id, 'id_projeto': self.projeto.id})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'O membro não está vinculado ao projeto informado')
        self.assertEqual(response.data['code'], 'MEMBRO_SEM_PROJETO')
        
    def test_filtrar_tarefas_nenhum_id_fornecido(self):
        # Testa o caso em que nenhum parâmetro é fornecido
        response = self.client.get(self.filtrar_tarefas_por_projeto_e_por_membro_url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do membro e o ID do projeto não foram fornecidos!')
        
    def test_excluir_tarefas_dados_validos(self):
        # Testa a exclusão de tarefas com sucesso
        ids_tarefas = [self.tarefa.id]
        response = self.client.delete(self.excluir_tarefas_url, data={'ids_tarefas': ids_tarefas}, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['detail'], "Tarefas excluídas com sucesso")

        # Verifica se as tarefas foram excluídas do banco de dados
        self.assertEqual(Tarefa.objects.filter(id=self.tarefa.id).count(), 0)
    
    def test_excluir_tarefas_ids_nao_encontradas(self):
        # Testa o caso onde as tarefas não são encontradas
        ids_tarefas = [9999, 10000]  # IDs que não existem
        response = self.client.delete(self.excluir_tarefas_url, data={'ids_tarefas': ids_tarefas}, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Uma ou mais tarefas não foram encontradas')

    def test_excluir_tarefas_nao_fornecer_ids_tarefas(self):
        # Testa o caso onde os IDs das tarefas não são fornecidos
        response = self.client.delete(self.excluir_tarefas_url, data={}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O IDs das tarefas não foram fornecidos')