from django.db import models
from apps.membro_projeto.models import MembroProjeto


class CategoriaFuncaoMembro(models.Model):
    nome = models.CharField(max_length=100, default='membro')
    descricao = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.nome
    

class FuncaoMembro(models.Model):
    membro_projeto = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    categoria_funcao = models.ForeignKey(CategoriaFuncaoMembro, on_delete=models.PROTECT, default=1, null=True, blank=True)
    status = models.BooleanField(default=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['membro_projeto', 'categoria_funcao'], name='unique_funcao_membro')
        ]
        
    def __str__(self):
        return f"{self.membro_projeto.membro.nome} - {self.categoria_funcao.nome}"