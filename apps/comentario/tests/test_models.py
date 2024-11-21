from django.test import TestCase
from django.utils import timezone
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.tarefa.models import Tarefa
from apps.artefato.models import Artefato
from apps.comentario.models import ComentarioTarefa, ComentarioArtefato

class ComentarioModelTests(TestCase):

    def setUp(self):
        # Setup MembroProjeto, Tarefa e Artefato para os testes

        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.membroProjeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.tarefa = Tarefa.objects.create(nome='Tarefa Teste', descricao='Descrição da Tarefa')
        self.artefato = Artefato.objects.create(nome='Artefato Teste', descricao='Descrição do Artefato')

        # Cria ComentarioTarefa e ComentarioArtefato
        self.comentario_tarefa = ComentarioTarefa.objects.create(
            texto='Comentário na Tarefa',
            autor=self.membroProjeto,
            tarefa=self.tarefa
        )
        
        self.comentario_artefato = ComentarioArtefato.objects.create(
            texto='Comentário no Artefato',
            autor=self.membroProjeto,
            artefato=self.artefato
        )

    def test_comentario_tarefa_str(self):
        self.assertEqual(str(self.comentario_tarefa), f'Comentário por {self.membroProjeto.membro.nome} em {self.comentario_tarefa.data_hora} na tarefa {self.tarefa.nome}')

    def test_comentario_artefato_str(self):
        self.assertEqual(str(self.comentario_artefato), f'Comentário por {self.membroProjeto.membro.nome} em {self.comentario_artefato.data_hora} no artefato {self.artefato.nome}')

    def test_construir_arvore_sem_respostas(self):
        comentarios = [self.comentario_tarefa]
        arvore = ComentarioTarefa.construir_arvore(comentarios)
        self.assertEqual(len(arvore), 1)
        self.assertEqual(arvore[0]['id'], self.comentario_tarefa.id)
        self.assertEqual(len(arvore[0]['respostas']), 0)

    def test_construir_arvore_com_respostas(self):
        comentario_pai = ComentarioTarefa.objects.create(
            texto='Comentário Pai',
            autor=self.membroProjeto,
            tarefa=self.tarefa
        )
        
        comentario_filho = ComentarioTarefa.objects.create(
            texto='Comentário Filho',
            autor=self.membroProjeto,
            tarefa=self.tarefa,
            comentario_pai=comentario_pai
        )
        
        comentarios = [comentario_pai, comentario_filho]
        arvore = ComentarioTarefa.construir_arvore(comentarios)
        self.assertEqual(len(arvore), 1)
        self.assertEqual(len(arvore[0]['respostas']), 1)
        self.assertEqual(arvore[0]['respostas'][0]['id'], comentario_filho.id)

