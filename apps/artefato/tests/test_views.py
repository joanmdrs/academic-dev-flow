from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.artefato.models import Artefato
from django.contrib.auth.models import Group
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.usuario.models import Usuario


class ArtefatoViewsTest(APITestCase):
    
    def setUp(self):
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.projeto1 = Projeto.objects.create(
            nome="Projeto 01", data_inicio='2024-08-17', data_termino='2024-08-30')
        self.projeto2 = Projeto.objects.create(
            nome="Projeto 02", data_inicio='2024-08-17', data_termino='2024-08-30')
        self.projeto3 = Projeto.objects.create(
            nome="Projeto 03", data_inicio='2024-08-17', data_termino='2024-08-30')
        
        self.usuario1 = Usuario.objects.create(username="membro.01@email.com", password="senha")
        self.usuario2 = Usuario.objects.create(username="membro.02@email.com", password="senha")
        self.usuario3 = Usuario.objects.create(username="membro.03@email.com", password="senha")
        self.usuario4 = Usuario.objects.create(username="membro.04@email.com", password="senha")
        
        self.membro1 = Membro.objects.create(
            nome="Membro 01", email="membro.01@email.com", usuario=self.usuario1, grupo=self.grupo)
        self.membro2 = Membro.objects.create(
            nome="Membro 02", email="membro.02@email.com", usuario=self.usuario2, grupo=self.grupo)
        self.membro3 = Membro.objects.create(
            nome="Membro 03", email="membro.03@email.com", usuario=self.usuario3, grupo=self.grupo)
        self.membro4 = Membro.objects.create(
            nome="Membro 04", email="membro.04@email.com", usuario=self.usuario4, grupo=self.grupo)
        
        self.membro_projeto1 = MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto1)
        self.membro_projeto2 = MembroProjeto.objects.create(membro=self.membro2, projeto=self.projeto2)
        self.membro_projeto3 = MembroProjeto.objects.create(membro=self.membro3, projeto=self.projeto3)
        
        self.iteracao = Iteracao.objects.create(
            nome='Iteração teste', data_inicio="2025-01-01", data_termino="2025-01-30", projeto=self.projeto1)
        
        self.artefato1 = Artefato.objects.create(
            nome="Artefato 01", 
            descricao="Descrição do artefato 01", 
            status='pendente', 
            data_termino="2025-08-20", 
            projeto=self.projeto1,
            iteracao=self.iteracao
        )
        self.artefato1.membros.add(self.membro_projeto1)
        
        self.artefato2 = Artefato.objects.create(
            nome="Artefato 02", 
            descricao="Descrição do artefato 02", 
            status='pendente', 
            data_termino="2025-08-20", 
            projeto=self.projeto2,
            iteracao=self.iteracao
        )
        
        self.artefato2.membros.add(self.membro_projeto2)
    
        self.dados_teste = {
            'nome': 'Artefato Teste',
            'projeto': self.projeto1.id,
            'status': 'pendente',
        }
        
        ### Urls
        self.cadastrar_artefato_url = reverse('artefato:cadastrar_artefato')
        self.atualizar_artefato_url = reverse('artefato:atualizar_artefato')
        self.buscar_artefato_por_nome_url = reverse('artefato:buscar_artefato_por_nome')
        self.buscar_artefato_por_id_url = reverse('artefato:buscar_artefato_por_id')
        self.buscar_artefato_por_nome_e_por_projeto_url = reverse('artefato:buscar_artefato_por_nome_e_por_projeto')
        self.listar_artefatos_url = reverse('artefato:listar_artefatos')
        self.listar_artefatos_por_projeto_url = reverse('artefato:listar_artefatos_por_projeto')
        self.listar_artefatos_por_iteracao_url = reverse('artefato:listar_artefatos_por_iteracao')
        self.listar_artefatos_dos_projetos_do_membro_url = reverse('artefato:listar_artefatos_dos_projetos_do_membro')
        self.filtrar_artefatos_por_projeto_e_por_membro_url = reverse('artefato:filtrar_artefatos_por_projeto_e_por_membro')
        self.excluir_artefato_url = reverse('artefato:excluir_artefato')
        
        
    def test_criar_artefato_com_dados_validos(self):
        """Teste: Quando os dados são válidos, o artefato deve ser criado com sucesso."""
        response = self.client.post(self.cadastrar_artefato_url, self.dados_teste, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], 'Artefato Teste')
        self.assertEqual(response.data['projeto'], self.projeto1.id)
        
    def test_criar_artefato_sem_nome(self):
        """Teste: Quando o campo 'nome' está ausente, deve retornar erro 400."""
        invalid_data = self.dados_teste.copy()
        invalid_data['nome'] = ''  
        response = self.client.post(self.cadastrar_artefato_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "O campo nome é obrigatório para criação do artefato.")

    def test_criar_artefato_sem_projeto(self):
        """Teste: Quando o campo 'projeto' está ausente, deve retornar erro 400."""
        invalid_data = self.dados_teste.copy()
        invalid_data['projeto'] = None  
        response = self.client.post(self.cadastrar_artefato_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "O campo projeto é obrigatório para criação do artefato.")
        
    def test_criar_artefato_sem_dados(self):
        """Teste: Quando não são fornecidos dados, deve retornar erro 400."""
        response = self.client.post(self.cadastrar_artefato_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Os dados do artefato não foram fornecidos na Request.")
        
    def test_criar_artefato_com_dados_invalidos(self):
        """Teste: Quando os dados fornecidos não são válidos, deve retornar erro 400."""
        invalid_data = self.dados_teste.copy()
        invalid_data['status'] = 'invalido'  # Status inválido
        response = self.client.post(self.cadastrar_artefato_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(response.data['error'], "{'status': [ErrorDetail(string='\"invalido\" não é um escolha válido.', code='invalid_choice')]}")    
        
    def test_criar_artefato_usuario_nao_autenticado(self):
        """Teste: Quando os dados são válidos, o artefato deve ser criado com sucesso."""
        self.client.logout()
        response = self.client.post(self.cadastrar_artefato_url, self.dados_teste, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_atualizar_artefato_com_sucesso(self):
        """Teste: Atualizar artefato com sucesso."""
        # Dados válidos para atualização
        data = {"nome": "Artefato Atualizado", "status": "finalizado"}
        payload = self.dados_teste.copy()
        payload['projeto'] = self.projeto1
        artefato_teste = Artefato.objects.create(**payload)
        
        response = self.client.patch(f'{self.atualizar_artefato_url}?id_artefato={artefato_teste.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        artefato_teste.refresh_from_db()
        self.assertEqual(artefato_teste.nome, "Artefato Atualizado")
        self.assertEqual(artefato_teste.status, "finalizado")
        
    def test_atualizar_artefato_id_nao_fornecido(self):
        """Teste: Quando o ID do artefato não é fornecido."""
        response = self.client.patch(self.atualizar_artefato_url, {"nome": "Novo Nome"}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "O ID do artefato não foi fornecido!")
        
    def test_atualizar_artefato_artefato_nao_encontrado(self):
        """Teste: Quando o artefato não é encontrado."""
        response = self.client.patch(
            f'{self.atualizar_artefato_url}?id_artefato={9999}', {"nome": "Nome Atualizado"}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Artefato não encontrado!")
        
    def test_atualizar_artefato_dados_invalidos(self):
        """Teste: Quando os dados fornecidos são inválidos."""
        data = {"nome": "", "status": "finalizado"}
        payload = self.dados_teste.copy()
        payload['projeto'] = self.projeto1
        artefato_teste = Artefato.objects.create(**payload)
        response = self.client.patch(f'{self.atualizar_artefato_url}?id_artefato={artefato_teste.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(response.data['error'], "{'nome': [ErrorDetail(string='Este campo não pode ser em branco.', code='blank')]}")
        
    def test_atualizar_artefato_usuario_nao_autenticado(self):
        """Teste: Atualizar artefato com sucesso."""
        self.client.logout()
        payload = self.dados_teste.copy()
        payload['projeto'] = self.projeto1
        data = {"nome": "Artefato Atualizado", "status": "finalizado"}
        artefato_teste = Artefato.objects.create(**payload)
        
        response = self.client.patch(f'{self.atualizar_artefato_url}?id_artefato={artefato_teste.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_artefato_por_nome_com_sucesso(self):
        """Teste: Buscar artefato por nome."""
        response = self.client.get(self.buscar_artefato_por_nome_url, {'nome_artefato': 'Artefato'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['nome'], "Artefato 01")
        
    def test_buscar_artefato_por_nome_sem_parametro(self):
        """Teste: Quando nenhum nome de artefato é fornecido, todos os artefatos devem ser retornados."""
        response = self.client.get(self.buscar_artefato_por_nome_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  
        
    def test_buscar_artefato_por_nome_parametro_nao_encontrado(self):
        """Teste: Quando nenhum artefato for encontrado com o nome fornecido."""
        response = self.client.get(self.buscar_artefato_por_nome_url, {'nome_artefato': 'Inexistente'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, [])  
        
    def test_buscar_artefato_por_nome_usuario_nao_autenticado(self):
        """Teste: Buscar artefato por nome com usuário não autenticado"""
        self.client.logout()
        response = self.client.get(self.buscar_artefato_por_nome_url, {'nome_artefato': 'Artefato'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_buscar_artefato_pelo_id_com_sucesso(self):
        """Teste: Buscar artefato por ID."""
        response = self.client.get(self.buscar_artefato_por_id_url, {'id_artefato': self.artefato1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.artefato1.id)
        self.assertEqual(response.data['nome'], self.artefato1.nome)
        self.assertEqual(response.data['status'], self.artefato1.status)
        
    def test_buscar_artefato_id_nao_fornecido(self):
        """Teste: Quando o ID do artefato não for fornecido, deve retornar erro 400."""
        response = self.client.get(self.buscar_artefato_por_id_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do artefato não foi fornecido!')
        
    def test_buscar_artefato_por_id_nao_encontrado(self):
        """Teste: Quando o artefato com o ID fornecido não for encontrado, deve retornar erro 404."""
        response = self.client.get(self.buscar_artefato_por_id_url, {'id_artefato': 9999}, format='json')  
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Artefato não encontrado !')
        
    def test_buscar_artefato_pelo_id_usuario_nao_autenticado(self):
        """Teste: Buscar artefato por ID. Usuário não autenticado"""
        self.client.logout()
        response = self.client.get(self.buscar_artefato_por_id_url, {'id_artefato': self.artefato1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_artefatos_pelo_nome_e_projeto_com_sucesso(self):
        """Teste: Buscar artefatos pelo nome e projeto."""
        response = self.client.get(
            self.buscar_artefato_por_nome_e_por_projeto_url, 
            {'nome_artefato': 'Artefato 01', 'id_projeto': self.projeto1.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], self.artefato1.nome)
        self.assertEqual(response.data[0]['projeto'], self.projeto1.id)
        
    def test_buscar_artefatos_pelo_nome_sem_projeto(self):
        """Teste: Buscar artefatos pelo nome."""
        response = self.client.get(
            self.buscar_artefato_por_nome_e_por_projeto_url, 
            {'nome_artefato': 'Artefato'}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['nome'], self.artefato1.nome)
        
    def test_buscar_artefatos_pelo_projeto_sem_nome(self):
        """Teste: Buscar artefatos pelo projeto."""
        response = self.client.get(
            self.buscar_artefato_por_nome_e_por_projeto_url, 
            {'id_projeto': self.projeto1.id}, 
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
        self.assertEqual(response.data[0]['nome'], 'Artefato 01') 
        
    def test_buscar_artefatos_sem_nome_e_sem_projeto(self):
        """Teste: Buscar todos os artefatos."""
        response = self.client.get(self.buscar_artefato_por_nome_e_por_projeto_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  
        
    def test_buscar_artefatos_pelo_nome_e_pelo_projeto_parametros_nao_encontrados(self):
        """Teste: Quando nenhum artefato for encontrado, deve retornar 204."""
        response = self.client.get(
            self.buscar_artefato_por_nome_e_por_projeto_url, 
            {'nome_artefato': 'Não Existe', 'id_projeto': self.projeto1.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, [])  
        
    def test_buscar_artefatos_pelo_nome_e_projeto_usuario_nao_autenticado(self):
        """Teste: Buscar artefatos pelo nome e projeto."""
        self.client.logout()
        response = self.client.get(
            self.buscar_artefato_por_nome_e_por_projeto_url, 
            {'nome_artefato': 'Artefato 01', 'id_projeto': self.projeto1.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_artefatos_com_sucesso(self):
        """Teste: Quando houver artefatos, eles devem ser listados corretamente."""
        response = self.client.get(self.listar_artefatos_url, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
        self.assertIn(self.artefato2.nome, artefatos_nomes)
        
    def test_listar_artefatos_sem_dados(self):
        """Teste: Quando não houver artefatos, deve retornar 204 No Content."""
        Artefato.objects.all().delete()
        response = self.client.get(self.listar_artefatos_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, [])  
        
    def test_listar_artefatos_usuario_nao_autenticado(self):
        """Teste: Quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_artefatos_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_artefatos_por_projeto_id_projeto_nao_fornecido(self):
        """Teste: Quando o ID do projeto não é fornecido, deve retornar erro 400."""
        response = self.client.get(self.listar_artefatos_por_projeto_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID do projeto não foi fornecido'})
        
    def test_listar_artefatos_por_projeto_com_sucesso(self):
        """Teste: Quando o ID do projeto for válido, deve listar os artefatos associados ao projeto."""
        response = self.client.get(self.listar_artefatos_por_projeto_url, {'id_projeto': self.projeto1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
        
    def test_listar_artefatos_por_projeto_sem_resultados(self):
        """Teste: Quando não houver artefatos para o projeto, deve retornar 204 No Content."""
        response = self.client.get(self.listar_artefatos_por_projeto_url, {'id_projeto': self.projeto3.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, [])  

    def test_listar_artefatos_por_projeto_usuario_nao_autenticado(self):
        """Teste: Quando o ID do projeto for válido, deve listar os artefatos associados ao projeto."""
        self.client.logout()
        response = self.client.get(self.listar_artefatos_por_projeto_url, {'id_projeto': self.projeto1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_artefatos_por_iteracao_id_iteracao_nao_fornecido(self):
        """Teste: Quando o ID da iteração não é fornecido, deve retornar erro 400."""
        response = self.client.get(self.listar_artefatos_por_iteracao_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID da iteração não foi fornecido!'})
        
    def test_listar_artefatos_por_iteracao_com_sucesso(self):
        """Teste: Quando o ID da iteração for válido, deve listar os artefatos associados ao projeto."""
        response = self.client.get(self.listar_artefatos_por_iteracao_url, {'id_iteracao': self.iteracao.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
    
    def test_listar_artefatos_por_iteracao_sem_resultados(self):
        """Teste: Quando não houver artefatos para a iteração, deve retornar 204 No Content."""
        response = self.client.get(self.listar_artefatos_por_iteracao_url, {'id_iteracao': 999}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, [])  
        
    def test_listar_artefatos_por_iteracao_com_usuario_nao_autenticado(self):
        """Teste: Quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_artefatos_por_iteracao_url, {'id_iteracao': self.iteracao.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_artefatos_dos_projetos_do_membro_id_membro_nao_fornecido(self):
        """Teste: Quando o ID do membro não é fornecido, deve retornar erro 400."""
        response = self.client.get(self.listar_artefatos_dos_projetos_do_membro_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID do membro não foi fornecido!'})
        
    def test_listar_artefatos_dos_projetos_membro_nao_vinculado_a_projeto(self):
        """Teste: Quando o membro não está vinculado a nenhum projeto, deve retornar mensagem específica."""
        response = self.client.get(
            self.listar_artefatos_dos_projetos_do_membro_url, 
            {'id_membro': self.membro4.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'O membro não está vinculado a nenhum projeto')
        self.assertEqual(response.data['code'], 'MEMBRO_SEM_PROJETO')

    def test_listar_artefatos_dos_projetos_membro_com_projetos_sem_artefatos(self):
        """Teste: Quando o membro está vinculado a projetos, mas não há artefatos, deve retornar lista vazia."""
        response = self.client.get(
            self.listar_artefatos_dos_projetos_do_membro_url, 
            {'id_membro': self.membro3.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, []) 
        
    def test_listar_artefatos_dos_projetos_do_membro_com_artefatos(self):
        """Teste: Quando o membro está vinculado a projetos com artefatos, deve retornar os artefatos associados."""
        response = self.client.get(
            self.listar_artefatos_dos_projetos_do_membro_url, 
            {'id_membro': self.membro1.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
        
    def test_listar_artefatos_dos_projetos_do_membro_usuario_nao_autenticado(self):
        """Teste: Quando o usuário não está autenticado, deve retornar erro 401."""
        self.client.logout()
        response = self.client.get(self.listar_artefatos_dos_projetos_do_membro_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_filtrar_artefatos_por_projeto_e_por_membro_sem_parametros(self):
        """Teste: Quando nenhum ID do membro ou do projeto é fornecido, deve retornar erro 400."""
        response = self.client.get(self.filtrar_artefatos_por_projeto_e_por_membro_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID do membro e o ID do projeto não foram fornecidos!'})
        
    def test_filtrar_artefatos_por_projeto_e_por_membro_id_membro_fornecido(self):
        """Teste: Quando o ID do membro é fornecido sem o ID do projeto, deve retornar os artefatos associados ao membro nos projetos."""
        response = self.client.get(
            self.filtrar_artefatos_por_projeto_e_por_membro_url, 
            {'id_membro': self.membro1.id}, 
            
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
        
    def test_filtrar_artefatos_por_projeto_e_por_membro_id_projeto_fornecido(self):
        """Teste: Quando o ID do projeto é fornecido sem o ID do membro, deve retornar os artefatos associados ao projeto."""
        response = self.client.get(
            self.filtrar_artefatos_por_projeto_e_por_membro_url, 
            {'id_projeto': self.projeto1.id}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
    
    def test_filtrar_artefatos_por_projeto_e_por_membro_todos_os_parametros(self):
        """Teste: Quando ambos os IDs (membro e projeto) são fornecidos, deve retornar os artefatos do membro no projeto."""
        response = self.client.get(
            self.filtrar_artefatos_por_projeto_e_por_membro_url, 
            {'id_membro': self.membro1.id, 'id_projeto': self.projeto1.id}, 
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        artefatos_nomes = [artefato['nome'] for artefato in response.data]
        self.assertIn(self.artefato1.nome, artefatos_nomes)
    
    def test_filtrar_artefatos_por_projeto_e_por_membro_usuario_nao_autenticado(self):
        """Teste: Quando o usuário não está autenticado, deve-se retornar 401"""
        self.client.logout()
        response = self.client.get(
            self.filtrar_artefatos_por_projeto_e_por_membro_url, 
            {'id_membro': self.membro1.id, 'id_projeto': self.projeto1.id}, 
            format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_artefatos_com_sucesso(self):
        """Teste: Exclusão bem-sucedida de artefatos."""
        ids_artefatos = [self.artefato1.id, self.artefato2.id]
        response = self.client.delete(self.excluir_artefato_url, data={"ids_artefatos": ids_artefatos}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Artefato.objects.count(), 0)  
        
    def test_excluir_artefatos_sem_ids(self):
        """Teste: Requisição sem IDs dos artefatos."""
        response = self.client.delete(self.excluir_artefato_url, data={}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Os Ids dos artefatos não foram fornecidos !"})
        
    def test_excluir_artefatos_nao_existentes(self):
        """Teste: Tentativa de excluir artefatos inexistentes."""
        ids_artefatos = [999, 1000]  # IDs que não existem no banco de dados
        response = self.client.delete(self.excluir_artefato_url, data={"ids_artefatos": ids_artefatos}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"error": "Um ou mais artefatos não foram encontrados"})
        
    def test_excluir_artefatos_usuario_nao_autenticado(self):
        """Teste: Exclusão bem-sucedida de artefatos."""
        self.client.logout()
        ids_artefatos = [self.artefato1.id, self.artefato2.id]
        response = self.client.delete(self.excluir_artefato_url, data={"ids_artefatos": ids_artefatos}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    






        
        
        
    








    

    

