from django.test import TestCase
from apps.artefato.models import Artefato
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao

class ArtefatoModelTest(TestCase):
    
    def setUp(self):
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.iteracao = Iteracao.objects.create(nome="Iteração 1", numero=1, data_inicio='2024-08-17', data_termino='2024-08-30')
        self.artefato = Artefato.objects.create(
            nome="Artefato Exemplo",
            descricao="Descrição do artefato",
            projeto=self.projeto,
            iteracao=self.iteracao,
            id_file="12345",
            path_file="/caminho/do/arquivo"
        )
    
    def test_criacao_artefato(self):
        self.assertEqual(self.artefato.nome, "Artefato Exemplo")
        self.assertEqual(self.artefato.status, "criado")
    
    def test_str_representation(self):
        self.assertEqual(str(self.artefato), "Artefato Exemplo")
    
    def test_artefato_projeto_associado(self):
        self.assertEqual(self.artefato.projeto.nome, "Projeto Exemplo")
    
    def test_artefato_iteracao_associada(self):
        self.assertEqual(self.artefato.iteracao.nome, "Iteração 1")
