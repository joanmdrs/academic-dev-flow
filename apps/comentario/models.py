from django.db import models
from apps.membro_projeto.models import MembroProjeto

class Comentario(models.Model):
    texto = models.TextField()
    data_hora = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    comentario_pai = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='respostas')

    def __str__(self):
        return f'Comentário por {self.autor.membro.nome} em {self.data_hora}'
