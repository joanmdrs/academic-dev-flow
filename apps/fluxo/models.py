from django.db import models

class Fluxo(models.Model):

    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    
    
    
    
    
