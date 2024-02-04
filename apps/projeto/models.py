from django.db import models
from apps.fluxo.models import Fluxo

class Projeto(models.Model):
        
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    status = models.CharField(max_length=20)
    data_inicio = models.DateField("Data Início")
    data_fim = models.DateField("Data Fim")
    fluxo = models.OneToOneField(Fluxo, on_delete=models.SET_NULL, related_name='fluxo', null=True, blank=True)
    
