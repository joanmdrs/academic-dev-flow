from django.db import models
from apps.projeto.models import Projeto

class Iteracao(models.Model):

    nome = models.CharField(max_length=200)
    numero = models.IntegerField()
    descricao = models.TextField(null=True)
    status = models.CharField()
    data_inicio = models.DateField()
    data_fim = models.DateField()
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='projeto', null=True, blank=True)

    def __str__(self):
        return self.nome

