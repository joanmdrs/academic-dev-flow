from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.projeto.models import Projeto

class Tarefa(models.Model):
    
    nome = models.CharField(max_length=255)
    descricao = models.TextField(null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    concluida = models.BooleanField(default=False)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    membro = models.ForeignKey(MembroProjeto, on_delete=models.SET_NULL, null=True, blank=True)

    def concluir_tarefa(self):
        self.concluida = True
        self.data_fim = models.DateTimeField(auto_now=True)
        self.save()

    def __str__(self):
        return self.nome

