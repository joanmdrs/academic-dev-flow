from django.test import TestCase
from apps.tipo.models import Tipo

class TipoModelTest(TestCase):
    def setUp(self):
        # Cria uma instância do modelo Tipo para uso nos testes
        self.tipo = Tipo.objects.create(
            nome='Tipo de Teste',
            descricao='Descrição do Tipo de Teste',
            cor='#FFFFFF'
        )

    def test_tipo_criacao(self):
        # Verifica se o Tipo foi criado corretamente
        self.assertEqual(self.tipo.nome, 'Tipo de Teste')
        self.assertEqual(self.tipo.descricao, 'Descrição do Tipo de Teste')
        self.assertEqual(self.tipo.cor, '#FFFFFF')

    def test_str_representation(self):
        # Verifica a representação em string do Tipo
        self.assertEqual(str(self.tipo), 'Tipo de Teste')

    def test_campos(self):
        # Verifica os campos do modelo
        tipo = Tipo.objects.get(id=self.tipo.id)
        self.assertEqual(tipo.nome, 'Tipo de Teste')
        self.assertEqual(tipo.descricao, 'Descrição do Tipo de Teste')
        self.assertEqual(tipo.cor, '#FFFFFF')
