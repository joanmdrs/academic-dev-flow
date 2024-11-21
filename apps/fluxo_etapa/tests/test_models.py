from django.test import TestCase
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from apps.fluxo_etapa.models import FluxoEtapa

class FluxoEtapaModelTests(TestCase):

    def setUp(self):
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste", descricao="Descrição do Fluxo Teste")
        self.etapa = Etapa.objects.create(nome="Etapa Teste", descricao="Descrição da Etapa Teste")
        self.fluxo_etapa = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa)

    def test_fluxo_etapa_creation(self):
        """Testa a criação de uma instância de FluxoEtapa."""
        fluxo_etapa = FluxoEtapa.objects.get(fluxo=self.fluxo, etapa=self.etapa)
        self.assertEqual(fluxo_etapa.fluxo, self.fluxo)
        self.assertEqual(fluxo_etapa.etapa, self.etapa)

    def test_str_representation(self):
        """Testa a representação em string da instância de FluxoEtapa."""
        self.assertEqual(str(self.fluxo_etapa), "Etapa Teste")

    def test_deleting_fluxo(self):
        """Testa o comportamento ao deletar um Fluxo associado a FluxoEtapa."""
        self.fluxo_etapa.save()
        self.fluxo.delete()
        # Verifica se FluxoEtapa associada foi removida
        fluxo_etapa_exists = FluxoEtapa.objects.filter(etapa=self.etapa).exists()
        self.assertFalse(fluxo_etapa_exists)
    
    def test_deleting_etapa(self):
        """Testa o comportamento ao deletar uma Etapa associada a FluxoEtapa."""
        self.fluxo_etapa.save()
        self.etapa.delete()
        # Verifica se FluxoEtapa associada foi removida
        fluxo_etapa_exists = FluxoEtapa.objects.filter(fluxo=self.fluxo).exists()
        self.assertFalse(fluxo_etapa_exists)