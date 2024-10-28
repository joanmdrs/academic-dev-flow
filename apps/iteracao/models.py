from django.db import models
from apps.projeto.models import Projeto
from apps.release.models import Release
from apps.membro_projeto.models import MembroProjeto
from apps.fluxo_etapa.models import FluxoEtapa

class Iteracao(models.Model):
    STATUS_CHOICES = [
        ('criada', 'Criada'),
        ('andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada')
    ]

    nome = models.CharField(max_length=200)
    ordem = models.IntegerField()
    descricao = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='criada')
    data_inicio = models.DateField()
    data_termino = models.DateField()
    release = models.ForeignKey(Release, on_delete=models.CASCADE, null=True, blank=True)
    etapa = models.ForeignKey(FluxoEtapa, on_delete=models.SET_NULL, null=True, blank=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='iteracoes', null=True, blank=True)
    responsavel = models.ForeignKey(MembroProjeto, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nome

