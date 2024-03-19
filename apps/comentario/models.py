from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.documento.models import Documento

class Comentario(models.Model):
    texto = models.TextField()
    data_hora = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    documento = models.ForeignKey(Documento, on_delete=models.CASCADE, null=True, blank=True)  
    comentario_pai = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='respostas')

    def __str__(self):
        return f'Comentário por {self.autor.membro.nome} em {self.data_hora}'
    
    @classmethod
    def construir_arvore(cls, comentarios, comentario_pai=None):
        arvore = []
        for comentario in comentarios:
            if comentario.comentario_pai == comentario_pai:
                subarvore = cls.construir_arvore(comentarios, comentario)
                arvore.append({
                    'id': comentario.id,
                    'texto': comentario.texto,
                    'data_hora': comentario.data_hora,
                    'autor': comentario.autor,
                    'respostas': subarvore
                })
        return arvore
