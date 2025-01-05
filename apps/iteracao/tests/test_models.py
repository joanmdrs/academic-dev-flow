from django.test import TestCase
from django.utils import timezone
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.usuario.models import Usuario
from apps.membro_projeto.models import MembroProjeto
from apps.etapa.models import Etapa
from apps.fluxo.models import Fluxo
from apps.fluxo_etapa.models import FluxoEtapa
from apps.iteracao.models import Iteracao
from apps.release.models import Release
from django.contrib.auth.models import Group
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError

class IteracaoModelTest(TestCase):
    def setUp(self):
        """Configura o ambiente de teste criando instâncias necessárias."""
        self.projeto = Projeto.objects.create(
            nome="Projeto Exemplo", data_inicio='2024-08-17', data_termino='2024-08-30')
        
        self.grupo = Group.objects.create(name="TestGroup")
        self.usuario = Usuario.objects.create(username="membro.teste@email.com", password="senha")
        self.membro = Membro.objects.create(
            nome="Membro teste", email='membro.teste@email.com', grupo=self.grupo, usuario=self.usuario)
        self.responsavel = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.release = Release.objects.create(
            nome="Release teste", data_lancamento="2025-01-30", projeto=self.projeto, responsavel=self.responsavel)
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste", descricao="Descrição do Fluxo Teste")
        self.etapa = Etapa.objects.create(nome="Etapa Teste", descricao="Descrição da Etapa Teste")
        self.etapas = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa)
        
    def test_criacao_da_iteracao(self):
        """Teste para garantir que a iteração seja criada corretamente."""
        Iteracao.objects.create(
            nome="Iteração de Teste",
            descricao="Descrição da Iteração",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            responsavel=self.responsavel,
            release=self.release
        )
        
        iteracao = Iteracao.objects.get(nome="Iteração de Teste")
        
        self.assertEqual(iteracao.nome, "Iteração de Teste")
        self.assertEqual(iteracao.status, "pendente")
        self.assertEqual(iteracao.projeto, self.projeto)
        self.assertEqual(iteracao.responsavel, self.responsavel)
        self.assertEqual(iteracao.release, self.release)
    
    def test_iteracao_status_choices(self):
        """Teste para verificar se o campo 'status' está aceitando os valores válidos."""
        
        valid_status_choices = ['pendente', 'andamento', 'concluida', 'cancelada', 'bloqueada']
        
        for status in valid_status_choices:
            iteracao = Iteracao.objects.create(
                nome=f"Iteração {status}",
                descricao="Descrição da Iteração",
                status=status,
                data_inicio=timezone.now().date(),
                data_termino=timezone.now().date(),
                projeto=self.projeto,
                responsavel=self.responsavel,
                release=self.release
            )
            self.assertEqual(iteracao.status, status)

    def test_iteracao_status_invalido(self):
        """Teste para garantir que um status inválido gera um erro."""
        iteracao = Iteracao(
            nome="Iteração Status Inválido",
            descricao="Descrição com status inválido",
            status="invalido",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            responsavel=self.responsavel,
        )
        with self.assertRaises(ValidationError):
            iteracao.full_clean()
            iteracao.save()
            
    def test_criar_iteracao_sem_nome(self):
        """Teste para verificar quando o campo nome não é fornecido"""
        iteracao = Iteracao(
            nome=None,
            descricao="Descrição com status inválido",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            responsavel=self.responsavel,
        )
        with self.assertRaises(ValidationError):
            iteracao.full_clean()
            iteracao.save()
            
    def test_exclusao_projeto(self):
        """Teste para verificar se a iteração é excluída quando o projeto é excluído."""
        iteracao = Iteracao.objects.create(
            nome="Iteração de Teste",
            descricao="Descrição da Iteração",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            responsavel=self.responsavel,
            release=self.release
        )
        
        Projeto.objects.all().delete()
        iteracoes = Iteracao.objects.all()
        self.assertEqual(iteracoes.count(), 0)
        
    def test_exclusao_responsavel(self):
        """Teste para verificar se o campo responsável muda para NULL, mediante a exclusão do responsável."""
        iteracao = Iteracao.objects.create(
            nome="Iteração de Teste",
            descricao="Descrição da Iteração",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            responsavel=self.responsavel,
            release=self.release
        )
        
        MembroProjeto.objects.all().delete()
        iteracao_atualizada = Iteracao.objects.get(id=iteracao.id)
        self.assertIsNone(iteracao_atualizada.responsavel)
        
    def test_exclusao_release(self):
        """Teste para verificar se a iteração é excluída, mediante exclusão da release"""
        iteracao = Iteracao.objects.create(
            nome="Iteração de Teste",
            descricao="Descrição da Iteração",
            status="pendente",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            responsavel=self.responsavel,
            release=self.release
        )
        
        # Excluir o projeto associado
        Release.objects.all().delete()
        
        # Verificar se as iterações foram excluídas
        iteracoes = Iteracao.objects.all()
        self.assertEqual(iteracoes.count(), 0)

            
