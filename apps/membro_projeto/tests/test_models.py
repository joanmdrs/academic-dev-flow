from django.test import TestCase
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.usuario.models import Usuario
from apps.membro_projeto.models import MembroProjeto

class MembroProjetoModelTest(TestCase):
    def setUp(self):
        # Criar instâncias de Projeto e Membro para testes
        self.projeto = Projeto.objects.create(nome="Projeto Teste", data_inicio="2025-01-04", data_termino="2025-01-30")
        self.usuario = Usuario.objects.create(username="membro.teste@email.com", password="senha")
        self.membro = Membro.objects.create(nome="Membro Teste", email="membro.teste@email.com", usuario=self.usuario)

    def test_criacao_membro_projeto(self):
        # Testar a criação de uma instância de MembroProjeto
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        self.assertEqual(membro_projeto.projeto, self.projeto)
        self.assertEqual(membro_projeto.membro, self.membro)
        self.assertEqual(str(membro_projeto), f"{self.membro} - {self.projeto}")

    def test_constraint_unique_membro_projeto(self):
        # Testar a restrição de unicidade
        MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        with self.assertRaises(Exception):
            # Tentar criar uma relação duplicada
            MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)

    def test_delecao_projeto(self):
        # Testar se a exclusão de um projeto também exclui as relações
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        self.projeto.delete()
        with self.assertRaises(MembroProjeto.DoesNotExist):
            MembroProjeto.objects.get(id=membro_projeto.id)

    def test_delecao_membro(self):
        # Testar se a exclusão de um membro também exclui as relações
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        self.membro.delete()
        with self.assertRaises(MembroProjeto.DoesNotExist):
            MembroProjeto.objects.get(id=membro_projeto.id)
