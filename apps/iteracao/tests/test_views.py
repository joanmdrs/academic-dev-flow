from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone 
from apps.usuario.models import Usuario
from django.contrib.auth.models import Group
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.fluxo_etapa.models import FluxoEtapa
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from apps.release.models import Release
from apps.iteracao.models import Iteracao
from apps.iteracao.serializers import IteracaoSerializer
from datetime import date

class IteracaoViewsTest(APITestCase):
    def setUp(self):
        """Configura o ambiente de teste criando instâncias necessárias."""
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.fluxo = Fluxo.objects.create(nome="Fluxo de teste", descricao="Descrição do Fluxo de Teste")

        self.etapa1 = Etapa.objects.create(nome="Etapa 01", descricao="Descrição da Etapa 01")
        self.etapa2 = Etapa.objects.create(nome="Etapa 02", descricao="Descrição da Etapa 02")
        self.etapa3 = Etapa.objects.create(nome="Etapa 03", descricao="Descrição da Etapa 03")

        self.fluxo_etapa1 = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa1)
        self.fluxo_etapa2 = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa2)
        self.fluxo_etapa3 = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa3)
        
        self.projeto1 = Projeto.objects.create(
            nome="Projeto 01", data_inicio='2024-08-17', data_termino='2024-08-30', fluxo=self.fluxo)
        self.projeto2 = Projeto.objects.create(
            nome="Projeto 02", data_inicio='2024-08-17', data_termino='2024-08-30', fluxo=self.fluxo)
        self.projeto3 = Projeto.objects.create(
            nome="Projeto 03", data_inicio='2024-08-17', data_termino='2024-08-30', fluxo=self.fluxo)
        
        self.usuario1 = Usuario.objects.create(username="membro.01@email.com", password="senha")
        self.usuario2 = Usuario.objects.create(username="membro.02@email.com", password="senha")
        self.usuario3 = Usuario.objects.create(username="membro.03@email.com", password="senha")
        
        self.membro1 = Membro.objects.create(
            nome="Membro 01", email="membro.01@email.com", usuario=self.usuario1, grupo=self.grupo)
        self.membro2 = Membro.objects.create(
            nome="Membro 02", email="membro.02@email.com", usuario=self.usuario2, grupo=self.grupo)
        self.membro3 = Membro.objects.create(
            nome="Membro 03", email="membro.03@email.com", usuario=self.usuario3, grupo=self.grupo)
        
        self.responsavel1 = MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto1)
        self.responsavel2 = MembroProjeto.objects.create(membro=self.membro2, projeto=self.projeto2)
        ##self.responsavel3 = MembroProjeto.objects.create(membro=self.membro3, projeto=self.projeto3)
        
        self.release1 = Release.objects.create(
            nome="Release 01", data_lancamento="2025-01-30", projeto=self.projeto1, responsavel=self.responsavel1)
        self.release2 = Release.objects.create(
            nome="Release 02", data_lancamento="2025-01-30", projeto=self.projeto2, responsavel=self.responsavel2)   
        # self.release3 = Release.objects.create(
        #     nome="Release 03", data_lancamento="2025-01-30", projeto=self.projeto3, responsavel=self.responsavel3)    
        
        self.dados_teste = {
            "nome": "Iteração para testes",
            "descricao": "Descrição da iteração de testes",
            "status": "pendente",
            "data_inicio": timezone.now().date(),
            "data_termino": timezone.now().date(),
            "projeto": self.projeto1,
            "responsavel": self.responsavel1,
            "release": self.release1,
        }
        
        self.iteracao1 = Iteracao.objects.create(
            nome="Iteração Teste 1",
            descricao="Descrição da Iteração Teste 1",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto1,
            release=self.release1,
        )

        self.iteracao2 = Iteracao.objects.create(
            nome="Iteração Teste 2",
            descricao="Descrição da Iteração Teste 2",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto1,
            release=self.release1,
        )
    
        
        ### Urls 
        self.cadastrar_iteracao_url = reverse('iteracao:cadastrar_iteracao')
        self.atualizar_iteracao_url = reverse('iteracao:atualizar_iteracao')
        self.buscar_iteracao_pelo_id_url = reverse('iteracao:buscar_iteracao_pelo_id')
        self.buscar_iteracao_por_projeto_url = reverse('iteracao:buscar_iteracao_por_projeto')
        self.listar_iteracoes_url = reverse('iteracao:listar_iteracoes')
        self.filtrar_iteracoes_pelo_nome_e_pelo_projeto_url = reverse('iteracao:filtrar_iteracoes_pelo_nome_e_pelo_projeto')
        self.buscar_iteracoes_dos_projetos_do_membro_url = reverse('iteracao:buscar_iteracoes_dos_projetos_do_membro')
        self.excluir_iteracao_url = reverse('iteracao:excluir_iteracao')
        self.buscar_iteracao_atual_do_projeto_url = reverse('iteracao:buscar_iteracao_atual_do_projeto')
    
    def test_cadastrar_iteracao_com_sucesso(self):
        """Teste para garantir que uma iteração seja criada com sucesso."""
        data = {
            "nome": "Iteração de Teste",
            "descricao": "Descrição da Iteração",
            "status": "pendente",
            "data_inicio": timezone.now().date(),
            "data_termino": timezone.now().date(),
            "projeto": self.projeto1.id,
            "responsavel": self.responsavel1.id,
            "release": self.release1.id,
        }

        response = self.client.post(self.cadastrar_iteracao_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nome"], data["nome"])
        self.assertEqual(response.data["status"], data["status"])
        
    def test_cadastrar_iteracao_dados_invalidos(self):
        """Teste para garantir que um erro seja retornado quando dados inválidos forem enviados."""
        data = {
            "nome": None,
            "descricao": "Descrição Inválida",
            "status": "pendente",  # Status inválido
            "data_inicio": timezone.now().date(),
            "data_termino": timezone.now().date(),
            "projeto": self.projeto1.id,
            "responsavel": self.responsavel1.id,
            "release": self.release1.id,
        }

        response = self.client.post(self.cadastrar_iteracao_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], "{'nome': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}")       
        
    def test_cadastrar_iteracao_request_data_vazio(self):
        """Teste para quando os dados não são passados na request""" 
    
        response = self.client.post(self.cadastrar_iteracao_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(response.data['error'], "Os dados da iteração não foram fornecidos no corpo da requisição.")
        
        
    def test_cadastrar_iteracao_nao_autenticado(self):
        """Teste para garantir que o usuário precisa estar autenticado para criar uma iteração."""
        self.client.logout()

        data = {
            "nome": "Iteração Não Autenticada",
            "descricao": "Tentativa de criação sem autenticação",
            "status": "pendente",
            "data_inicio": timezone.now().date(),
            "data_termino": timezone.now().date(),
            "projeto": self.projeto1.id,
            "responsavel": self.responsavel1.id,
            "release": self.release1.id,
        }

        response = self.client.post(self.cadastrar_iteracao_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_atualizar_iteracao_com_sucesso(self):
        """Testa a atualização parcial de uma iteração existente."""
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)

        data = {
            "nome": "Iteração Atualizada",
            "descricao": "Descrição atualizada"
        }
        response = self.client.patch(
            f"{self.atualizar_iteracao_url}?id_iteracao={iteracao_teste.id}", data, format='json')
        iteracao_teste.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(iteracao_teste.nome, "Iteração Atualizada")
        self.assertEqual(iteracao_teste.descricao, "Descrição atualizada")
        
    def test_atualizar_iteracao_sem_id(self):
        """Testa a tentativa de atualizar uma iteração sem fornecer o ID."""
        data = {
            "nome": "Iteração Atualizada"
        }
        response = self.client.patch(self.atualizar_iteracao_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("O ID da iteração não foi fornecido !", response.data['error'])
        
    def test_atualizar_iteracao_nao_existente(self):
        """Testa a tentativa de atualizar uma iteração que não existe."""
        data = {
            "nome": "Iteração Atualizada"
        }
        response = self.client.patch(
            f"{self.atualizar_iteracao_url}?id_iteracao=999", data
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("Iteracao matching query does not exist.", response.data['error'])
    
    def test_atualizar_iteracao_dados_invalidos(self):
        """Testa a tentativa de atualizar uma iteração com dados inválidos."""
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)

        data = {
            "nome": ""
        }
        response = self.client.patch(
            f"{self.atualizar_iteracao_url}?id_iteracao={iteracao_teste.id}", data
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(response.data['error'], "{'nome': [ErrorDetail(string='Este campo não pode ser em branco.', code='blank')]}")
        
    def teste_atualizar_iteracao_usuario_nao_autenticado(self):
        """Teste para quando o usuário não está autenticado"""
        self.client.logout()
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)

        data = {
            "nome": "Iteração atualizada"
        }
        response = self.client.patch(
            f"{self.atualizar_iteracao_url}?id_iteracao={iteracao_teste.id}", data
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_iteracao_pelo_id_com_sucesso(self):
        """Teste: Buscar iteração existente com sucesso."""
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)
        response = self.client.get(self.buscar_iteracao_pelo_id_url, {"id_iteracao": iteracao_teste.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nome"], iteracao_teste.nome)
        self.assertEqual(response.data["descricao"], iteracao_teste.descricao)
    
    def test_buscar_iteracao_sem_id(self):
        """Teste: Falha ao buscar iteração sem fornecer o ID."""
        response = self.client.get(self.buscar_iteracao_pelo_id_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "O ID da iteração não foi fornecido !")

    def test_buscar_iteracao_id_invalido(self):
        """Teste: Falha ao buscar iteração com ID inexistente."""
        response = self.client.get(self.buscar_iteracao_pelo_id_url, {"id_iteracao": 9999})  # ID inexistente
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data["error"], "Iteracao matching query does not exist.")
        
    def test_buscar_iteracao_pelo_id_usuario_nao_autenticado(self):
        """Teste: Buscar iteração existente com sucesso."""
        self.client.logout()
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)
        response = self.client.get(self.buscar_iteracao_pelo_id_url, {"id_iteracao": iteracao_teste.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_buscar_iteracoes_por_projeto_com_sucesso(self):
        """Teste: Listar iterações de um projeto com sucesso."""
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)
        response = self.client.get(self.buscar_iteracao_por_projeto_url, {"id_projeto": self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3) 
        
    def test_buscar_iteracoes_sem_id_projeto(self):
        """Teste: Falha ao listar iterações sem fornecer o ID do projeto."""
        response = self.client.get(self.buscar_iteracao_por_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "O ID do projeto não foi fornecido!")
        
    def test_buscar_iteracoes_projeto_sem_iteracoes(self):
        """Teste: Listar iterações de um projeto sem iterações (deve retornar lista vazia)."""
        response = self.client.get(self.buscar_iteracao_por_projeto_url, {"id_projeto": self.projeto2.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])  
        
    def test_buscar_iteracoes_com_id_invalido(self):
        """Teste: Falha ao listar iterações com ID de projeto inexistente."""
        response = self.client.get(self.buscar_iteracao_por_projeto_url, {"id_projeto": 9999}) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, []) 

    def test_buscar_iteracoes_por_projeto_usuario_nao_autenticado(self):
        """Teste para quando o usuário não está autenticado"""
        self.client.logout()
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)
        response = self.client.get(self.buscar_iteracao_por_projeto_url, {"id_projeto": self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_listar_iteracoes_com_sucesso(self):
        """Teste: Listar todas as iterações com sucesso."""
        response = self.client.get(self.listar_iteracoes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2) 
        self.assertEqual(response.data[0]["nome"], self.iteracao1.nome)
        
    def test_listar_iteracoes_sem_dados(self):
        """Teste: Listar iterações quando não há nenhuma criada."""
        Iteracao.objects.all().delete()
        response = self.client.get(self.listar_iteracoes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])  
        
    def test_listar_iteracoes_usuario_nao_autenticado(self):
        """Teste: Listar todas as iterações com sucesso."""
        self.client.logout()
        iteracao_teste = Iteracao.objects.create(**self.dados_teste)
        response = self.client.get(self.listar_iteracoes_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_filtrar_iteracoes_sem_filtro(self):
        """Teste: Listar todas as iterações quando nenhum filtro é fornecido."""
    
        response = self.client.get(self.filtrar_iteracoes_pelo_nome_e_pelo_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  
        self.assertEqual(response.data[0]["nome"], self.iteracao1.nome)
        self.assertEqual(response.data[1]["nome"], self.iteracao2.nome)
        
    def test_filtrar_iteracoes_por_nome(self):
        """Teste: Filtrar iterações pelo nome da iteração."""
        response = self.client.get(
            self.filtrar_iteracoes_pelo_nome_e_pelo_projeto_url, {"nome_iteracao": "Iteração Teste 1"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["nome"], self.iteracao1.nome)
        
    def test_filtrar_iteracoes_por_projeto(self):
        """Teste: Filtrar iterações pelo projeto."""
        response = self.client.get(self.filtrar_iteracoes_pelo_nome_e_pelo_projeto_url, {"id_projeto": self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["nome"], self.iteracao1.nome)
        
    def test_filtrar_iteracoes_por_nome_e_projeto(self):
        """Teste: Filtrar iterações pelo nome e projeto."""
        response = self.client.get(
            self.filtrar_iteracoes_pelo_nome_e_pelo_projeto_url, 
            {"nome_iteracao": "Iteração Teste 1", "id_projeto": self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["nome"], self.iteracao1.nome)

    def test_filtrar_iteracoes_por_nome_e_por_projeto_usuario_nao_autenticado(self):
        """Teste para quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(
            self.filtrar_iteracoes_pelo_nome_e_pelo_projeto_url, 
            {"nome_iteracao": "Iteração Teste 1", "id_projeto": self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_iteracoes_sem_id_membro(self):
        """Teste: Quando o ID do membro não é fornecido."""
        response = self.client.get(self.buscar_iteracoes_dos_projetos_do_membro_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID do membro não foi fornecido !'})
        
    def test_buscar_iteracoes_membro_sem_projetos(self):
        """Teste: Quando o membro não está vinculado a nenhum projeto."""
        response = self.client.get(self.buscar_iteracoes_dos_projetos_do_membro_url, {"id_membro": self.membro3.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "O membro não está vinculado a nenhum projeto")
        self.assertEqual(response.data["code"], "MEMBRO_SEM_PROJETO")
        
    def test_buscar_iteracoes_membro_com_projetos_sem_iteracoes(self):
        """Teste: Quando o membro está vinculado a projetos, mas não há iterações associadas."""
        Iteracao.objects.all().delete() 
        response = self.client.get(self.buscar_iteracoes_dos_projetos_do_membro_url, {"id_membro": self.membro1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_buscar_iteracoes_membro_com_projetos_com_iteracoes(self):
        """Teste: Quando o membro está vinculado a projetos e há iterações associadas."""
        response = self.client.get(self.buscar_iteracoes_dos_projetos_do_membro_url, {"id_membro": self.membro1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Espera 2 iterações, uma para cada projeto
        self.assertEqual(response.data[0]["nome"], self.iteracao1.nome)
        
    def teste_buscar_iteracoes_dos_projetos_do_membro_usuario_nao_autenticado(self):
        """Teste para quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.buscar_iteracoes_dos_projetos_do_membro_url, {"id_membro": self.membro1.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_iteracoes_com_sucesso(self):
        """Teste para quando as iterações são encontradas e excluídas com sucesso"""
        response = self.client.delete(
            self.excluir_iteracao_url, data={"ids_iteracoes": [self.iteracao1.id, self.iteracao2.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["detail"], "Iterações excluídas com sucesso")

    def test_excluir_iteracao_nenhum_id_fornecido(self):
        """Teste: Quando nenhum ID de iteração é fornecido."""
        response = self.client.delete(self.excluir_iteracao_url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "IDs das iterações a serem excluídas não foram fornecidos")

    def test_excluir_iteracoes_nao_encontradas(self):
        """Teste: Quando as iterações não são encontradas pelos IDs fornecidos."""
        response = self.client.delete(self.excluir_iteracao_url, data={"ids_iteracoes": [999, 1000]})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Iterações não encontradas !")
        
    def test_excluir_iteracoes_usuario_nao_autenticado(self):
        """Teste: Quando as iterações são excluídas com sucesso."""
        self.client.logout()      
        response = self.client.delete(self.excluir_iteracao_url, data={"ids_iteracoes": [self.iteracao1.id, self.iteracao2.id]})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_buscar_iteracao_atual_sem_id_projeto(self):
        """Teste: Quando o ID do projeto não é fornecido."""
        response = self.client.get(self.buscar_iteracao_atual_do_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID do projeto não foi fornecido !'})
        
    def test_buscar_iteracao_sem_iteracao_ativa(self):
        """Teste: Quando não há iteração ativa para o projeto."""
        self.iteracao1.data_inicio = date(2024, 1, 1)
        self.iteracao1.data_termino = date(2024, 12, 31)
        self.iteracao1.save()
        
        self.iteracao2.delete()

        response = self.client.get(self.buscar_iteracao_atual_do_projeto_url, {'id_projeto': self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'Não foi encontrada nenhuma iteração em andamento no momento!')
        self.assertEqual(response.data['code'], 'ITERACAO_NAO_ENCONTRADA')
        
    def test_buscar_iteracao_com_iteracao_ativa(self):
        """Teste: Quando há uma iteração ativa para o projeto."""
        projeto_teste = Projeto.objects.create(nome="Projeto de teste", data_inicio="2025-01-01", data_termino="2025-06-30")
        iteracao_teste = Iteracao.objects.create(nome="Iteracao de teste", data_inicio="2025-01-02", data_termino="2025-02-25", projeto=projeto_teste)
        response = self.client.get(self.buscar_iteracao_atual_do_projeto_url, {'id_projeto': projeto_teste.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], iteracao_teste.nome)
        self.assertEqual(response.data['id'], iteracao_teste.id)
        self.assertEqual(response.data['projeto'], iteracao_teste.projeto_id)
        
    def test_buscar_iteracao_atual_com_id_projeto_inexistente(self):
        """Teste: Quando o projeto não existe."""
        response = self.client.get(
            self.buscar_iteracao_atual_do_projeto_url, {'id_projeto': 999999})  # ID que não existe
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'Não foi encontrada nenhuma iteração em andamento no momento!')
        self.assertEqual(response.data['code'], 'ITERACAO_NAO_ENCONTRADA')
    
    def test_buscar_iteracao_atual_usuario_nao_autenticado(self):
        """Teste: Quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.buscar_iteracao_atual_do_projeto_url, {'id_projeto': self.projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)