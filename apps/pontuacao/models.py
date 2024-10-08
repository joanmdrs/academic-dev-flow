from django.db import models
from apps.membro_projeto.models import MembroProjeto
from django.utils import timezone

class Pontuacao(models.Model):
    
    nota = models.DecimalField(max_digits=5, decimal_places=2)
    data_atribuicao = models.DateTimeField(default=timezone.now)
    comentario = models.TextField(blank=True, null=True)
    autor = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    disponivel = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nota}"

