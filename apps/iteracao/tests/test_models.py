from django.test import TestCase
from django.utils import timezone
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.etapa.models import Etapa
from apps.fluxo.models import Fluxo
from apps.fluxo_etapa.models import FluxoEtapa
from apps.iteracao.models import Iteracao

class IteracaoModelTest(TestCase):
    def setUp(self):
        """Configura o ambiente de teste criando instâncias necessárias."""
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.membro_projeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste", descricao="Descrição do Fluxo Teste")
        self.etapa = Etapa.objects.create(nome="Etapa Teste", descricao="Descrição da Etapa Teste")
        self.fase = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa)
        self.iteracao = Iteracao.objects.create(
            nome="Iteração Teste",
            numero=1,
            descricao="Descrição da Iteração",
            status="criada",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            lider=self.membro_projeto,
            fase=self.fase
        )
    
    def test_iteracao_creation(self):
        """Testa a criação de uma instância de Iteracao."""
        iteracao = Iteracao.objects.get(nome="Iteração Teste")
        self.assertEqual(iteracao.numero, 1)
        self.assertEqual(iteracao.status, "criada")
        self.assertEqual(iteracao.projeto, self.projeto)
        self.assertEqual(iteracao.lider, self.membro_projeto)
        self.assertEqual(iteracao.fase, self.fase)
    
    def test_str_method(self):
        """Testa o método __str__ do modelo Iteracao."""
        self.assertEqual(str(self.iteracao), "Iteração Teste")
    
    def test_default_status(self):
        """Testa o status padrão ao criar uma instância de Iteracao sem status explícito."""
        iteracao = Iteracao.objects.create(
            nome="Iteração Teste 2",
            numero=2,
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date()
        )
        self.assertEqual(iteracao.status, "criada")

    def test_null_fields(self):
        """Testa se os campos podem ser nulos."""
        iteracao = Iteracao.objects.create(
            nome="Iteração Teste 3",
            numero=3,
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date()
        )
        self.assertIsNone(iteracao.projeto)
        self.assertIsNone(iteracao.lider)
        self.assertIsNone(iteracao.fase)
