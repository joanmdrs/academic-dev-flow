from django.test import TestCase
from django.utils import timezone
from apps.projeto.models import Projeto
from apps.fluxo.models import Fluxo

class ProjetoModelTest(TestCase):

    def setUp(self):
        """Cria uma instância de Fluxo e Projeto para os testes."""
        self.fluxo = Fluxo.objects.create(nome='Fluxo de Teste')
        self.projeto = Projeto.objects.create(
            nome='Projeto de Teste',
            descricao='Descrição do Projeto de Teste',
            status='andamento',
            data_inicio=timezone.now().date(),
            data_fim=timezone.now().date() + timezone.timedelta(days=30),
            nome_repo='repo-teste',
            link_repo='http://example.com/repo',
            link_site='http://example.com/site',
            token='token-teste',
            fluxo=self.fluxo
        )

    def test_projeto_creation(self):
        """Testa a criação de uma instância de Projeto."""
        self.assertTrue(isinstance(self.projeto, Projeto))
        self.assertEqual(str(self.projeto), 'Projeto de Teste')
        self.assertEqual(self.projeto.nome, 'Projeto de Teste')
        self.assertEqual(self.projeto.descricao, 'Descrição do Projeto de Teste')
        self.assertEqual(self.projeto.status, 'andamento')
        self.assertEqual(self.projeto.nome_repo, 'repo-teste')
        self.assertEqual(self.projeto.link_repo, 'http://example.com/repo')
        self.assertEqual(self.projeto.link_site, 'http://example.com/site')
        self.assertEqual(self.projeto.token, 'token-teste')
        self.assertEqual(self.projeto.fluxo, self.fluxo)
    
    def test_projeto_str(self):
        """Testa o método __str__ do Projeto."""
        self.assertEqual(str(self.projeto), 'Projeto de Teste')
