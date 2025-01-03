from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.projeto.models import Projeto
from apps.fluxo.models import Fluxo
from apps.usuario.models import Usuario
from django.utils import timezone

class ProjetoViewsTest(TestCase):
    def setUp(self):
        """Configura o ambiente para os testes, criando instâncias necessárias."""
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.fluxo = Fluxo.objects.create(nome='Fluxo de Teste')
        
        self.projeto = Projeto.objects.create(
            nome='Projeto de Teste',
            descricao='Descrição do Projeto de Teste',
            status='andamento',
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date() + timezone.timedelta(days=30),
            nome_repo='repo-teste',
            link_repo='http://example.com/repo',
            link_site='http://example.com/site',
            token='token-teste',
            fluxo=self.fluxo
        )
        
        self.projeto1 = Projeto.objects.create(
            nome="Projeto de Teste 1",
            descricao="Descrição do Projeto de Teste 1",
            status="andamento",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date() + timezone.timedelta(days=30),
            nome_repo="repo1",
            link_repo="http://example.com/repo1",
            link_site="http://example.com/site1",
            token="token1",
            fluxo=self.fluxo,
        )
        self.projeto2 = Projeto.objects.create(
            nome="Outro Projeto",
            descricao="Descrição do Outro Projeto",
            status="concluido",
            data_inicio=timezone.now().date() - timezone.timedelta(days=60),
            data_termino=timezone.now().date() - timezone.timedelta(days=30),
            nome_repo="repo2",
            link_repo="http://example.com/repo2",
            link_site="http://example.com/site2",
            token="token2",
            fluxo=self.fluxo,
        )
        
        ### Urls 
        
        self.cadastrar_projeto_url = reverse('projeto:cadastrar_projeto')
        self.atualizar_projeto_url = reverse('projeto:atualizar_projeto')
        self.buscar_projetos_por_nome_url = reverse('projeto:buscar_projetos_por_nome')
        self.buscar_projeto_por_id_url = reverse('projeto:buscar_projeto_por_id')
        self.listar_projetos_url = reverse('projeto:listar_projetos')
        self.excluir_projeto_url = reverse('projeto:excluir_projeto')
        
    def test_cadastrar_projeto_com_sucesso(self):
        """Teste para cadastrar um projeto com todos os dados válidos."""
        data = {
            "nome": "Projeto Teste",
            "descricao": "Descrição do projeto",
            "status": "andamento",
            "data_inicio": "2025-01-01",
            "data_termino": "2025-01-31",
            "nome_repo": "repo-teste",
            "link_repo": "http://example.com/repo",
            "link_site": "http://example.com/site",
            "token": "token-teste",
            "fluxo": self.fluxo.id
        }
        response = self.client.post(self.cadastrar_projeto_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], data['nome'])
        self.assertEqual(response.data['fluxo'], self.fluxo.id)
        
    def test_cadastrar_projeto_faltando_nome(self):
        """Teste para verificar erro ao cadastrar projeto sem o nome."""
        data = {
            "descricao": "Descrição do projeto",
            "status": "andamento",
            "data_inicio": "2025-01-01",
            "data_termino": "2025-01-31",
            "nome_repo": "repo-teste",
            "link_repo": "http://example.com/repo",
            "link_site": "http://example.com/site",
            "token": "token-teste",
            "fluxo": self.fluxo.id
        }
        response = self.client.post(self.cadastrar_projeto_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Os seguintes campos obrigatórios estão ausentes: nome', str(response.data['error']))        
        
    def test_cadastrar_projeto_faltando_datas(self):
        """Teste para verificar erro ao cadastrar projeto sem data_inicio ou data_termino."""
        data = {
            "nome": "Projeto Teste",
            "descricao": "Descrição do projeto",
            "status": "andamento",
            "nome_repo": "repo-teste",
            "link_repo": "http://example.com/repo",
            "link_site": "http://example.com/site",
            "token": "token-teste",
            "fluxo": self.fluxo.id
        }
        response = self.client.post(self.cadastrar_projeto_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            'Os seguintes campos obrigatórios estão ausentes: data_inicio, data_termino', 
            str(response.data['error']))   
        
    def test_atualizar_projeto_com_sucesso(self):
        """Teste para atualizar um projeto com sucesso."""
        data = {"descricao": "Nova descrição"}
        response = self.client.patch(f'{self.atualizar_projeto_url}?id_projeto={self.projeto.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.projeto.refresh_from_db()
        self.assertEqual(self.projeto.descricao, "Nova descrição")
        
    def test_atualizar_projeto_sem_id(self):
        """Teste para verificar erro ao atualizar sem fornecer o ID do projeto."""
        data = {"descricao": "Nova descrição"}
        response = self.client.patch(self.atualizar_projeto_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('O ID do projeto não foi fornecido!', str(response.data['error']))

    def test_atualizar_projeto_inexistente(self):
        """Teste para verificar erro ao atualizar um projeto inexistente."""
        data = {"descricao": "Nova descrição"}
        response = self.client.patch(f'{self.atualizar_projeto_url}?id_projeto=999', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('Projeto matching query does not exist.', str(response.data['error']))
        
    def test_atualizar_projeto_com_dados_invalidos(self):
        """Teste para verificar erro ao atualizar projeto com dados inválidos."""
        data = {"data_termino": "data-invalida"}
        response = self.client.patch(f'{self.atualizar_projeto_url}?id_projeto={self.projeto.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(
            "Formato inválido para data. Use um dos formatos a seguir: YYYY-MM-DD.",
            str(response.data['error'])
        )

    def test_buscar_projetos_sem_nome(self):
        """Teste para buscar todos os projetos sem especificar um nome."""
        response = self.client.get(self.buscar_projetos_por_nome_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 3)
        self.assertEqual(response.data['message'], "Projetos encontrados com sucesso.")
        
    def test_buscar_projetos_por_nome_existente(self):
        """Teste para buscar projetos por um nome existente."""
        response = self.client.get(self.buscar_projetos_por_nome_url, {'nome_projeto': 'Teste'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][1]['nome'], "Projeto de Teste 1")
        self.assertEqual(response.data['message'], "Projetos encontrados com sucesso.")

    def test_buscar_projetos_por_nome_inexistente(self):
        """Teste para buscar projetos por um nome inexistente."""
        response = self.client.get(self.buscar_projetos_por_nome_url, {'nome_projeto': 'Inexistente'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)
        self.assertEqual(response.data['message'], "Nenhum projeto encontrado.")
    
    def test_buscar_projeto_por_id_com_sucesso(self):
        """Teste para buscar um projeto pelo ID com sucesso."""
        response = self.client.get(self.buscar_projeto_por_id_url, {'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], "Projeto de Teste")
        self.assertEqual(response.data['descricao'], "Descrição do Projeto de Teste")
        self.assertEqual(response.data['status'], "andamento")
        
    def test_buscar_projeto_por_id_nao_fornecido(self):
        """Teste para verificar a resposta quando o ID do projeto não é fornecido."""
        response = self.client.get(self.buscar_projeto_por_id_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "O ID do projeto não foi fornecido")
        
    def test_buscar_projeto_por_id_inexistente(self):
        """Teste para verificar a resposta ao buscar um projeto inexistente."""
        response = self.client.get(self.buscar_projeto_por_id_url, {'id_projeto': 999})
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], "Projeto matching query does not exist.")
        
    def test_listar_projetos_com_sucesso(self):
        """Teste para listar todos os projetos com sucesso."""
        response = self.client.get(self.listar_projetos_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[1]['nome'], "Projeto de Teste 1")
        self.assertEqual(response.data[2]['nome'], "Outro Projeto")

    def test_listar_projetos_vazio(self):
        """Teste para verificar a resposta quando não há projetos cadastrados."""
        Projeto.objects.all().delete()

        response = self.client.get(self.listar_projetos_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, [])
        
    def test_excluir_projeto_com_sucesso(self):
        """Teste para excluir um projeto com sucesso."""
        response = self.client.delete(f"{self.excluir_projeto_url}?id_projeto={self.projeto.id}")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'Projeto excluído com sucesso!')
        self.assertFalse(Projeto.objects.filter(id=self.projeto.id).exists())
        
    def test_excluir_projeto_sem_id(self):
        """Teste para tentar excluir um projeto sem fornecer o ID."""
        response = self.client.delete(self.excluir_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do projeto não foi fornecido !')

    def test_excluir_projeto_nao_encontrado(self):
        """Teste para tentar excluir um projeto inexistente."""
        response = self.client.delete(f"{self.excluir_projeto_url}?id_projeto=99999")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'Projeto matching query does not exist.')