from django.db import models
from apps.projeto.models import Projeto
from apps.fluxo_etapa.models import FluxoEtapa
from apps.membro_projeto.models import MembroProjeto

class Release(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
        ('bloqueada', 'Bloqueada')
    ]
    
    nome = models.CharField(max_length=200)
    descricao = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendentes')
    data_lancamento = models.DateField()
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    responsavel = models.ForeignKey(MembroProjeto, on_delete=models.SET_NULL, null=True, blank=True)
