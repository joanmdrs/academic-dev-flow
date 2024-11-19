from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from django.utils import timezone

class CategoriaFuncaoMembro(models.Model):
    nome = models.CharField(max_length=100, default='membro')
    descricao = models.TextField(null=True, blank=True)
    cor = models.CharField(max_length=7, null=True, blank=True)
    
    def __str__(self):
        return self.nome 

class FuncaoMembro(models.Model):
    membro_projeto = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    categoria_funcao = models.ForeignKey(CategoriaFuncaoMembro, on_delete=models.PROTECT, default=1)
    iteracao = models.ForeignKey(Iteracao, on_delete=models.CASCADE, null=True, blank=True)
    status = models.BooleanField(default=True)
    data_atribuicao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    data_desativacao = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['membro_projeto', 'categoria_funcao', 'iteracao', 'status'], name='unique_funcao_membro')
        ]

    def __str__(self):
        return f"{self.membro_projeto.membro.nome} - {self.categoria_funcao.nome}"

    def desativar_funcao(self):
        """Desativa a função e define a data de desativação."""
        self.status = False
        self.data_desativacao = timezone.now()
        self.save()
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['membro_projeto', 'categoria_funcao', 'iteracao', 'status'], name='unique_funcao_membro')
        ]
        
    def __str__(self):
        return f"{self.membro_projeto.membro.nome} - {self.categoria_funcao.nome}"