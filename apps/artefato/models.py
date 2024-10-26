from django.db import models
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao
from apps.pontuacao.models import Pontuacao
from apps.membro_projeto.models import MembroProjeto

class Artefato(models.Model):
    
    STATUS_CHOICES = [
        ('criado', 'Criado'),
        ('rascunho', 'Em rascunho'),
        ('revisao', 'Pendente de revisão'),
        ('aprovado', 'Aprovado'),
        ('finalizado', 'Finalizado')
    ]
    
    nome = models.CharField(max_length=255) 
    descricao = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=40, choices=STATUS_CHOICES, null=True, blank=True, default='criado')
    data_criacao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    data_termino = models.DateField(null=True, blank=True)
    url = models.CharField(null=True, blank=True)
    id_content = models.CharField(null=True, blank=True)   
    path_content = models.CharField(max_length=255, null=True, blank=True)
    membros = models.ManyToManyField(MembroProjeto, blank=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    iteracao = models.ForeignKey(Iteracao, on_delete=models.SET_NULL, null=True, blank=True)
    pontuacao = models.ForeignKey(Pontuacao, on_delete=models.SET_NULL, null=True, blank=True )
    
    def __str__(self):
        return self.nome
    
    
    

