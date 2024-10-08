from django.db import models
from apps.projeto.models import Projeto
from apps.membro.models import Membro

class MembroProjeto(models.Model):
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    membro = models.ForeignKey(Membro, on_delete=models.CASCADE)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['projeto', 'membro'], name='unique_membro_projeto')
        ]

    def __str__(self):
        return f"{self.membro} - {self.projeto}"