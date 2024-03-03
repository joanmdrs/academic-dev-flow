from django.db import models
from apps.usuario.models import Usuario

class Membro(models.Model):
    
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=20)
    data_nascimento = models.DateField("Data de nascimento")
    sexo = models.CharField(max_length=20)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    grupo = models.CharField(max_length=100, blank=True, null=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.nome
    
