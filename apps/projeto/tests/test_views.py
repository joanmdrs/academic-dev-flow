from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.projeto.models import Projeto
from apps.fluxo.models import Fluxo
from apps.usuario.models import Usuario

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
            data_inicio='2024-01-01',
            data_termino='2024-01-31',
            nome_repo='repo-teste',
            link_repo='http://example.com/repo',
            link_site='http://example.com/site',
            token='token-teste',
            fluxo=self.fluxo
        )
        self.valid_payload = {
            'nome': 'Projeto Novo',
            'descricao': 'Descrição do Projeto Novo',
            'status': 'criado',
            'data_inicio': '2024-02-01',
            'data_termino': '2024-02-28',
            'nome_repo': 'repo-novo',
            'link_repo': 'http://example.com/repo-novo',
            'link_site': 'http://example.com/site-novo',
            'token': 'token-novo',
            'fluxo': self.fluxo.id
        }
        self.invalid_payload = {
            'nome': '',
            'data_inicio': '2024-02-01',
            'data_fim': '2024-02-28',
        }

    def test_cadastrar_projeto(self):
        """Testa o cadastro de um novo projeto."""
        url = reverse('projeto:cadastrar_projeto')
        response = self.client.post(url, data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Projeto.objects.count(), 2)  # Verifica se um novo projeto foi criado
        self.assertEqual(Projeto.objects.get(nome='Projeto Novo').nome, 'Projeto Novo')

    def test_buscar_projetos_por_nome(self):
        """Testa a busca de projetos por nome."""
        url = reverse('projeto:buscar_projetos_por_nome') + '?name=Projeto de Teste'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data['results']), 1)
        self.assertEqual(data['results'][0]['nome'], 'Projeto de Teste')

    def test_buscar_projeto_pelo_id(self):
        """Testa a busca de um projeto pelo ID."""
        url = reverse('projeto:buscar_projeto_pelo_id', args=[self.projeto.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['id'], self.projeto.id)
        self.assertEqual(data['nome'], 'Projeto de Teste')

    def test_buscar_projetos_por_lista_de_ids(self):
        """Testa a busca de projetos por uma lista de IDs."""
        url = reverse('projeto:buscar_projetos_por_lista_ids') + '?ids[]={}'.format(self.projeto.id)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data['results']), 1)
        self.assertEqual(data['results'][0]['nome'], 'Projeto de Teste')

    def test_excluir_projeto(self):
        """Testa a exclusão de um projeto."""
        url = reverse('projeto:excluir_projeto', args=[self.projeto.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Projeto.objects.count(), 0)  # Verifica se o projeto foi excluído

    def test_atualizar_projeto(self):
        """Testa a atualização de um projeto existente."""
        url = reverse('projeto:atualizar_projeto', args=[self.projeto.id])
        response = self.client.patch(url, data={'nome': 'Projeto Atualizado'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Projeto.objects.get(id=self.projeto.id).nome, 'Projeto Atualizado')

    def test_atualizar_fluxo_projeto(self):
        """Testa a atualização do fluxo de um projeto."""
        novo_fluxo = Fluxo.objects.create(nome='Novo Fluxo')
        url = reverse('projeto:atualizar_fluxo', args=[self.projeto.id])
        response = self.client.patch(url, data={'fluxo_id': novo_fluxo.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Projeto.objects.get(id=self.projeto.id).fluxo, novo_fluxo)

    def test_listar_projetos(self):
        """Testa a listagem de todos os projetos."""
        url = reverse('projeto:listar_projetos')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['nome'], 'Projeto de Teste')
