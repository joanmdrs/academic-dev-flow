from django.db import models
from apps.projeto.models import Projeto
from apps.membro.models import Membro

class MembroProjeto(models.Model):
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    membro = models.ForeignKey(Membro, on_delete=models.CASCADE)
    funcao = models.CharField(max_length=40, null=True, blank=True, default="À definir")
    data_inicio = models.DateField(auto_now_add=True)
    data_fim = models.DateField(null=True, blank=True)