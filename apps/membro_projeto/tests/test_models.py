from django.test import TestCase
from django.utils import timezone
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import FuncaoMembroProjeto, MembroProjeto, FuncaoMembroProjetoAtual

class FuncaoMembroProjetoTests(TestCase):

    def test_funcao_membro_projeto_creation(self):
        """Testa a criação de uma instância de FuncaoMembroProjeto"""
        funcao = FuncaoMembroProjeto.objects.create(
            nome='Desenvolvedor',
            descricao='Responsável pelo desenvolvimento do projeto.'
        )
        self.assertEqual(funcao.nome, 'Desenvolvedor')
        self.assertEqual(funcao.descricao, 'Responsável pelo desenvolvimento do projeto.')

    def test_funcao_membro_projeto_str(self):
        """Testa o método __str__ do modelo FuncaoMembroProjeto"""
        funcao = FuncaoMembroProjeto.objects.create(nome='Tester')
        self.assertEqual(str(funcao), 'Tester')


class MembroProjetoTests(TestCase):

    def setUp(self):
        """Configura os dados necessários para os testes do MembroProjeto"""
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')

    def test_membro_projeto_creation(self):
        """Testa a criação de uma instância de MembroProjeto"""
        membro_projeto = MembroProjeto.objects.create(
            projeto=self.projeto,
            membro=self.membro
        )
        self.assertEqual(membro_projeto.projeto, self.projeto)
        self.assertEqual(membro_projeto.membro, self.membro)

    def test_membro_projeto_str(self):
        """Testa o método __str__ do modelo MembroProjeto"""
        membro_projeto = MembroProjeto.objects.create(
            projeto=self.projeto,
            membro=self.membro
        )
        self.assertEqual(str(membro_projeto), str(self.membro))


class FuncaoMembroProjetoAtualTests(TestCase):

    def setUp(self):
        """Configura os dados necessários para os testes do FuncaoMembroProjetoAtual"""
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.funcao = FuncaoMembroProjeto.objects.create(nome='Desenvolvedor')
        self.membro_projeto = MembroProjeto.objects.create(
            projeto=self.projeto,
            membro=self.membro
        )

    def test_funcao_membro_projeto_atual_creation(self):
        """Testa a criação de uma instância de FuncaoMembroProjetoAtual"""
        funcao_atual = FuncaoMembroProjetoAtual.objects.create(
            membro_projeto=self.membro_projeto,
            funcao_membro=self.funcao,
            data_inicio=timezone.now().date(),
            ativo=True
        )
        self.assertEqual(funcao_atual.membro_projeto, self.membro_projeto)
        self.assertEqual(funcao_atual.funcao_membro, self.funcao)
        self.assertIsNotNone(funcao_atual.data_inicio)
        self.assertTrue(funcao_atual.ativo)

    def test_unique_constraint_active_member_project(self):
        """Testa a restrição única para membros ativos em um projeto"""
        FuncaoMembroProjetoAtual.objects.create(
            membro_projeto=self.membro_projeto,
            funcao_membro=self.funcao,
            data_inicio=timezone.now().date(),
            ativo=True
        )
        with self.assertRaises(Exception):
            FuncaoMembroProjetoAtual.objects.create(
                membro_projeto=self.membro_projeto,
                funcao_membro=self.funcao,
                data_inicio=timezone.now().date(),
                ativo=True
            )
