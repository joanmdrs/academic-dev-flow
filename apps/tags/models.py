from django.db import models
from django.contrib.auth.models import User  # Caso queira associar a um usuário

class Tag(models.Model):
    nome = models.CharField(max_length=100, unique=True)  
    descricao = models.TextField(blank=True, null=True) 
    cor = models.CharField(max_length=7)
    data_criacao = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return self.nome