from django.test import TestCase
from apps.fluxo.models import Fluxo

class FluxoModelTests(TestCase):

    def setUp(self):
        # Configuração inicial para os testes
        self.fluxo = Fluxo.objects.create(
            nome='Fluxo Teste',
            descricao='Descrição do Fluxo Teste'
        )

    def test_criacao_fluxo(self):
        """ Testa se a criação de um Fluxo está funcionando corretamente """
        fluxo = Fluxo.objects.get(nome='Fluxo Teste')
        self.assertEqual(fluxo.nome, 'Fluxo Teste')
        self.assertEqual(fluxo.descricao, 'Descrição do Fluxo Teste')

    def test_string_representation(self):
        """ Testa a representação em string do Fluxo """
        self.assertEqual(str(self.fluxo), 'Fluxo Teste')

    def test_fluxo_sem_descricao(self):
        """ Testa se um Fluxo pode ser criado sem uma descrição """
        fluxo = Fluxo.objects.create(nome='Fluxo Sem Descricao')
        self.assertEqual(fluxo.nome, 'Fluxo Sem Descricao')
        self.assertIsNone(fluxo.descricao)

    def test_fluxo_com_descricao_nula(self):
        """ Testa se a descrição pode ser nula """
        fluxo = Fluxo.objects.create(nome='Fluxo Com Descricao Nula', descricao=None)
        self.assertEqual(fluxo.nome, 'Fluxo Com Descricao Nula')
        self.assertIsNone(fluxo.descricao)
