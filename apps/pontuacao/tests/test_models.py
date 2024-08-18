from django.test import TestCase
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.pontuacao.models import Pontuacao
from django.utils import timezone
from decimal import Decimal

class PontuacaoModelTest(TestCase):

    def setUp(self):
        """Configura o ambiente de teste."""
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.membro_projeto = MembroProjeto.objects.create(
            projeto=self.projeto,
            membro=self.membro, 
        )

    def test_create_pontuacao(self):
        """Testa a criação de um objeto Pontuacao."""
        pontuacao = Pontuacao.objects.create(
            nota=Decimal('9.75'),
            data_atribuicao=timezone.now(),
            comentario='Comentário de teste',
            autor=self.membro_projeto,
            disponivel=True
        )

        # Verifica se o objeto foi criado corretamente
        self.assertEqual(Pontuacao.objects.count(), 1)
        self.assertEqual(pontuacao.nota, Decimal('9.75'))
        self.assertIsNotNone(pontuacao.data_atribuicao)  # Deve ser preenchido automaticamente
        self.assertEqual(pontuacao.comentario, 'Comentário de teste')
        self.assertEqual(pontuacao.autor, self.membro_projeto)
        self.assertTrue(pontuacao.disponivel)

    def test_str_method(self):
        """Testa o método __str__ do modelo Pontuacao."""
        pontuacao = Pontuacao.objects.create(
            nota=Decimal('7.50'),
            data_atribuicao=timezone.now(),
            comentario='Outro comentário',
            autor=self.membro_projeto,
            disponivel=False
        )

        # Verifica se a representação em string está correta
        self.assertEqual(str(pontuacao), '7.50')
