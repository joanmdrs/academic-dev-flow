from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.tarefa.models import Tarefa
from apps.artefato.models import Artefato

class ComentarioBase(models.Model):
    mensagem = models.TextField()
    data_hora = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    comentario_pai = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='respostas')

    class Meta:
        abstract = True

    @classmethod
    def construir_arvore(cls, comentarios, comentario_pai=None):
        arvore = []
        for comentario in comentarios:
            if comentario.comentario_pai == comentario_pai:
                subarvore = cls.construir_arvore(comentarios, comentario)
                arvore.append({
                    'id': comentario.id,
                    'mensagem': comentario.mensagem,
                    'data_hora': comentario.data_hora,
                    'autor': comentario.autor,
                    'respostas': subarvore
                })
        return arvore

class ComentarioTarefa(ComentarioBase):
    tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE)

    def __str__(self):
        return f'Comentário por {self.autor.membro.nome} em {self.data_hora} na tarefa {self.tarefa.nome}'

class ComentarioArtefato(ComentarioBase):
    artefato = models.ForeignKey(Artefato, on_delete=models.CASCADE)

    def __str__(self):
        return f'Comentário por {self.autor.membro.nome} em {self.data_hora} no artefato {self.artefato.nome}'
