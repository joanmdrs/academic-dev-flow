from django.db import models

class Artefato(models.Model):
    
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    
    
