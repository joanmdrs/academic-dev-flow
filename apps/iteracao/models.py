from django.db import models
from apps.projeto.models import Projeto
from apps.membro_projeto.models import MembroProjeto
from apps.fluxo_etapa.models import FluxoEtapa

class Iteracao(models.Model):

    nome = models.CharField(max_length=200)
    numero = models.IntegerField()
    descricao = models.TextField(null=True)
    status = models.CharField()
    data_inicio = models.DateField()
    data_fim = models.DateField()
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='projeto', null=True, blank=True)
    gerente = models.ForeignKey(MembroProjeto, on_delete=models.SET_NULL, null=True, blank=True)
    fase = models.ForeignKey(FluxoEtapa, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nome

