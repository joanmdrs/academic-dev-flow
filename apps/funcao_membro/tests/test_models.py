from django.test import TestCase
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group
from django.utils import timezone
from apps.membro_projeto.models import MembroProjeto, Membro
from apps.usuario.models import Usuario
from apps.iteracao.models import Iteracao
from apps.funcao_membro.models import CategoriaFuncaoMembro, FuncaoMembro
from apps.projeto.models import Projeto

class CategoriaFuncaoMembroModelTest(TestCase):
    def setUp(self):
        self.categoria = CategoriaFuncaoMembro.objects.create(
            nome="Desenvolvedor",
            descricao="Responsável por codificar as funcionalidades.",
            cor="#FF5733"
        )

    def test_criar_categoria_funcao_membro(self):
        """Testa a criação de uma categoria de função."""
        self.assertEqual(self.categoria.nome, "Desenvolvedor")
        self.assertEqual(self.categoria.descricao, "Responsável por codificar as funcionalidades.")
        self.assertEqual(self.categoria.cor, "#FF5733")
        self.assertEqual(str(self.categoria), "Desenvolvedor")
        
    def test_criar_categoria_funcao_membro_dados_invalidos(self):
        """Testa a criação de uma instância de CategoriaFuncaoMembro com dados inválidos"""
        dados_invalidos = {
            "nome": None,
        }
        
        categoria = CategoriaFuncaoMembro(**dados_invalidos)  
        with self.assertRaises(ValidationError):
            categoria.full_clean()  
            categoria.save()  
        
    def test_atualizar_categoria_funcao_membro(self):
        """Testa a atualização de uma instância de CategoriaFuncaoMembro"""
        self.categoria.nome = 'Categoria Nova'
        self.categoria.save()
        
        self.assertEqual(self.categoria.nome, 'Categoria Nova')
        
    def test_buscar_categoria_funcao_membro(self):
        """Testa a busca de uma instância de CategoriaFuncaoMembro"""
        categoria = CategoriaFuncaoMembro.objects.get(id=self.categoria.id)
        
        self.assertEqual(categoria.nome, "Desenvolvedor")
        self.assertEqual(categoria.descricao, "Responsável por codificar as funcionalidades.")
        self.assertEqual(categoria.cor, "#FF5733")   


class FuncaoMembroModelTest(TestCase):
    def setUp(self):
        # Criar objetos auxiliares
        self.projeto = Projeto.objects.create(nome="Projeto Teste", data_inicio="2025-01-01", data_termino="2025-06-30")
        self.grupo = Group.objects.create(name="TestGroup")
        self.usuario = Usuario.objects.create(username="membro.teste@email.com", password="senha")
        self.membro = Membro.objects.create(
            nome="Membro teste", email='membro.teste@email.com', grupo=self.grupo, usuario=self.usuario)
        self.membro_projeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.iteracao = Iteracao.objects.create(
            nome="Iteração 1", data_inicio="2025-01-06", data_termino="2025-01-30", projeto=self.projeto)
        
        self.categoria = CategoriaFuncaoMembro.objects.create(
            nome="Categoria Teste", descricao="Responsável por testar.", cor="#00FF00")
        
        self.funcao = FuncaoMembro.objects.create(
            membro_projeto=self.membro_projeto,
            categoria_funcao=self.categoria,
            iteracao=self.iteracao,
            status=True
        )

    def test_criar_funcao_membro(self):
        """Testa a criação de uma função de membro."""
        self.assertEqual(self.funcao.membro_projeto, self.membro_projeto)
        self.assertEqual(self.funcao.categoria_funcao, self.categoria)
        self.assertEqual(self.funcao.iteracao, self.iteracao)
        self.assertTrue(self.funcao.status)
        self.assertIsNotNone(self.funcao.data_atribuicao)
        self.assertEqual(str(self.funcao), f"{self.membro.nome} - {self.categoria.nome}")

    def test_validacao_unicidade_funcao_membro(self):
        """Testa a restrição de unicidade definida no modelo."""
        with self.assertRaises(IntegrityError):
            FuncaoMembro.objects.create(
                membro_projeto=self.membro_projeto,
                categoria_funcao=self.categoria,
                iteracao=self.iteracao,
                status=True
            )

    def test_desativar_funcao(self):
        """Testa o método de desativação da função."""
        self.funcao.desativar_funcao()
        self.funcao.refresh_from_db()
        self.assertFalse(self.funcao.status)
        self.assertIsNotNone(self.funcao.data_desativacao)
        self.assertAlmostEqual(self.funcao.data_desativacao, timezone.now(), delta=timezone.timedelta(seconds=1))

    def test_criar_funcao_membro_sem_iteracao(self):
        """Testa a criação de uma função de membro sem iteracao."""
        funcao_sem_iteracao = FuncaoMembro.objects.create(
            membro_projeto=self.membro_projeto,
            categoria_funcao=self.categoria,
            iteracao=None,
            status=True
        )
        self.assertIsNone(funcao_sem_iteracao.iteracao)
        self.assertTrue(funcao_sem_iteracao.status)

    def test_criar_funcao_membro_categoria_padrao(self):
        """Testa a criação de uma função de membro com categoria padrão."""
        categoria_padrao = CategoriaFuncaoMembro.objects.create(nome="Membro Padrão")
        funcao_com_padrao = FuncaoMembro.objects.create(
            membro_projeto=self.membro_projeto,
            categoria_funcao=categoria_padrao,
            iteracao=self.iteracao,
            status=True
        )
        self.assertEqual(funcao_com_padrao.categoria_funcao.nome, "Membro Padrão")
        
    def test_funcao_membro_ao_excluir_membro(self):
        """Testa a função membro ao excluir a instância do MembroProjeto"""
        MembroProjeto.objects.all().delete()
        funcoes_membro = FuncaoMembro.objects.all()
        self.assertEqual(funcoes_membro.count(), 0)
        
    def test_funcao_membro_a_iteracao(self):
        """Testa a função membro ao excluir a instância da Iteração"""
        Iteracao.objects.all().delete()
        funcoes_membro = FuncaoMembro.objects.all()
        self.assertEqual(funcoes_membro.count(), 0)
