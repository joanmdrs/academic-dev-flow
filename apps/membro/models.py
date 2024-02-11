from django.db import models
from apps.usuario.models import Usuario

class Membro(models.Model):
    
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=20)
    data_nascimento = models.DateField("Data de nascimento")
    sexo = models.CharField(max_length=20)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    usuario = models.OneToOneField(Usuario, on_delete=models.SET_NULL, related_name='usuario', null=True, blank=True)

    



    
