from django.db import models
from apps.membro.models import Membro


class Usuario(models.Model):
    
    usuario = models.CharField(max_length=50, unique=True)
    senha = models.CharField(max_length=100, null=True)
    grupo = models.CharField(max_length=50)
    data_criacao = models.DateTimeField(auto_now_add=True)
    membro_id = models.OneToOneField(Membro, on_delete=models.CASCADE, related_name='usuario', null=True, blank=True)

    def __str__(self):
        return self.usuario
