from django.db import models
from django.conf import settings

class Fluxo(models.Model):

    nome = models.CharField(max_length=200)
    descricao = models.TextField(null=True, blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='fluxos_criados'
    )
    
    def __str__(self):
        return self.nome
    
    
    
    
    
