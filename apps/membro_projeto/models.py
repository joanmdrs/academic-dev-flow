from django.db import models
from apps.projeto.models import Projeto
from apps.membro.models import Membro

class FuncaoMembroProjeto(models.Model):
    
    nome = models.CharField(max_length=100, default='membro')
    descricao = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.nome

class MembroProjeto(models.Model):
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    membro = models.ForeignKey(Membro, on_delete=models.CASCADE)
    funcoes = models.ManyToManyField(FuncaoMembroProjeto, through='FuncaoMembroProjetoAtual')
    
    def __str__(self):
        return f"{self.membro}"

class FuncaoMembroProjetoAtual(models.Model):
    membro_projeto = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    funcao_membro = models.ForeignKey(FuncaoMembroProjeto, on_delete=models.CASCADE)
    data_inicio = models.DateField(null=True, blank=True)
    data_termino = models.DateField(null=True, blank=True)
    ativo = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['membro_projeto'], condition=models.Q(ativo=True), name='unique_active_member_project')
        ]
        
        