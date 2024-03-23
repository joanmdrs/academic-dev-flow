from django.db import models
from apps.membro_projeto.models import MembroProjeto

class Pontuacao(models.Model):
    
    nota = models.DecimalField(max_digits=5, decimal_places=2)
    data_atribuicao = models.DateTimeField(default=timezone.now)
    comentario = models.TextField(blank=True, null=True)
    autor = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)


    def __str__(self):
        return f"Nota: {self.nota} - Data de Atribuição: {self.data_atribuicao}"

