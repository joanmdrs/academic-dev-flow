from django.db import models

class Projeto(models.Model):
        
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    status = models.CharField(max_length=20)
    data_inicio = models.DateTimeField("Data Início")
    data_fim = models.DateTimeField("Data Fim")
    
