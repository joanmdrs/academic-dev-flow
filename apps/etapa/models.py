from django.db import models
from apps.flow.models import Flow

class Etapa(models.Model):
    
    STATUS_CHOICES = (
        ('Em andamento', 'Em andamento'),
        ('Concluída', 'Concluída'),
        ('Pendente', 'Pendente')
    )
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    data_inicio = models.DateField("Data Início")
    data_fim = models.DateField("Data Fim")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    flow = models.ForeignKey(Flow, on_delete=models.PROTECT)
