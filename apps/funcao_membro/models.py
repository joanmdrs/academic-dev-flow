from django.db import models
from apps.membro_projeto.models import MembroProjeto


class CategoriaFuncao(models.Model):
    nome = models.CharField(max_length=100, default='membro')
    descricao = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.nome
    

class FuncaoMembroProjeto(models.Model):
    membro_projeto = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    categoria_funcao = models.ForeignKey(CategoriaFuncao, on_delete=models.CASCADE, default=1, null=True, blank=True)
    data_inicio = models.DateField(null=True, blank=True)
    data_termino = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.membro_projeto.membro.nome} - {self.categoria_funcao.nome}"