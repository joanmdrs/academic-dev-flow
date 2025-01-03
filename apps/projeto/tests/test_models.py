from django.test import TestCase
from django.utils import timezone
from apps.projeto.models import Projeto
from apps.fluxo.models import Fluxo
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError

class ProjetoModelTest(TestCase):

    def setUp(self):
        """Cria uma instância de Fluxo e Projeto para os testes."""
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

    def test_criar_projeto(self):
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
        
    def test_criar_projeto_sem_fluxo(self):
        """Testa a criação de um projeto sem associar um fluxo."""
        projeto = Projeto.objects.create(
            nome='Projeto Sem Fluxo',
            descricao='Descrição de Projeto Sem Fluxo',
            status='andamento',
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date() + timezone.timedelta(days=30),
            nome_repo='repo-sem-fluxo',
            link_repo='http://example.com/repo-sem-fluxo',
            link_site='http://example.com/site-sem-fluxo',
            token='token-sem-fluxo'
        )
        self.assertTrue(isinstance(projeto, Projeto))
        self.assertIsNone(projeto.fluxo)
        
    def test_criar_projeto_sem_nome(self):
        """Testa a criação de um projeto sem nome, que deve falhar."""
        projeto = Projeto(
            descricao='Descrição sem nome',
            status='andamento',
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date() + timezone.timedelta(days=30),
            nome_repo='repo-sem-nome',
            link_repo='http://example.com/repo-sem-nome',
            link_site='http://example.com/site-sem-nome',
            token='token-sem-nome',
            fluxo=self.fluxo
        )
        with self.assertRaises(ValidationError):
            projeto.full_clean()

