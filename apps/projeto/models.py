from django.db import models
from apps.fluxo.models import Fluxo
from apps.membro.models import Membro

class Projeto(models.Model):
    
    STATUS_CHOICES = [
        ('planejamento', 'Em Planejamento'),
        ('criado', 'Criado'),
        ('andamento', 'Em Andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
        ('atrasado', 'Atrasado'),
        ('espera', 'Em espera')
    ]
    
    nome = models.CharField(max_length=200)
    descricao = models.TextField(blank=True, null=True)
    status = models.CharField(choices=STATUS_CHOICES, default='criado')
    data_inicio = models.DateField("Data Início")
    data_termino = models.DateField("Data Fim")
    nome_repo = models.CharField(max_length=200, null=True, blank=True)
    link_repo = models.CharField(max_length=200, null=True, blank=True)
    link_site = models.CharField(max_length=200, null=True, blank=True)
    token = models.CharField(max_length=200, null=True, blank=True)
    fluxo = models.ForeignKey(Fluxo, on_delete=models.SET_NULL, related_name='projetos', null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
