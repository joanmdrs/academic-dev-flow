from django.test import TestCase
from apps.etapa.models import Etapa  # Substitua 'seu_app' pelo nome real do seu aplicativo

class EtapaModelTests(TestCase):

    def setUp(self):
        # Configuração inicial para os testes
        self.etapa = Etapa.objects.create(
            nome='Etapa de Teste',
            descricao='Descrição detalhada da etapa de teste'
        )

    def test_criacao_etapa(self):
        # Verifica se a etapa foi criada e salva corretamente
        etapa = Etapa.objects.get(nome='Etapa de Teste')
        self.assertEqual(etapa.nome, 'Etapa de Teste')
        self.assertEqual(etapa.descricao, 'Descrição detalhada da etapa de teste')
    
    def test_string_representation(self):
        # Verifica se a representação em string da etapa está correta
        self.assertEqual(str(self.etapa), 'Etapa de Teste')
