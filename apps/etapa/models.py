from django.db import models
from apps.fluxo.models import Fluxo

class Etapa(models.Model):
    
    STATUS_CHOICES = (
        ('Em andamento', 'Em andamento'),
        ('Concluída', 'Concluída'),
        ('Pendente', 'Pendente')
    )
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
