from django.db import models

class Fluxo(models.Model):

    nome = models.CharField(max_length=200)
    descricao = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
    
    
    
    
