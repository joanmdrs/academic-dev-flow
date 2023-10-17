from django.test import TestCase
from apps.projeto.models import Projeto

class ProjetoModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Configuração inicial para o TestCase
        Projeto.objects.create(
            nome='Projeto Teste',
            descricao='Descrição do projeto de teste',
            status='em_andamento',
            data_inicio='2023-01-01T12:00:00Z',
            data_fim='2023-02-01T12:00:00Z'
        )

    def test_nome_max_length(self):
        projeto = Projeto.objects.get(id=1)
        max_length = projeto._meta.get_field('nome').max_length
        self.assertEquals(max_length, 200)

    def test_descricao_max_length(self):
        projeto = Projeto.objects.get(id=1)
        max_length = projeto._meta.get_field('descricao').max_length
        self.assertEquals(max_length, None)

    def test_status_choices(self):
        projeto = Projeto.objects.get(id=1)
        choices = dict(Projeto.STATUS_CHOICES)
        self.assertIn(projeto.status, choices)

    def test_str_representation(self):
        projeto = Projeto.objects.get(id=1)
        self.assertEquals("Projeto Teste", projeto.nome)
