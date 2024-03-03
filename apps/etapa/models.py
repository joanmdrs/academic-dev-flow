from django.db import models
from apps.fluxo.models import Fluxo

class Etapa(models.Model):

    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    
    def __str__(self):
        return self.nome
    
