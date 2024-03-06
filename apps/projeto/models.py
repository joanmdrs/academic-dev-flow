from django.db import models
from apps.fluxo.models import Fluxo
from apps.membro.models import Membro

class Projeto(models.Model):
        
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    status = models.CharField(max_length=20)
    data_inicio = models.DateField("Data Início")
    data_fim = models.DateField("Data Fim")
    fluxo = models.ForeignKey(Fluxo, on_delete=models.SET_NULL, related_name='projetos', null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
