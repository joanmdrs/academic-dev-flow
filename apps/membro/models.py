from django.db import models
from apps.usuario.models import Usuario

class UsuarioGithub(models.Model):
    nome_github = models.CharField(max_length=200)
    email_github = models.EmailField()
    usuario_github = models.CharField(max_length=200) 
    
    def __str__(self):
        return self.usuario_github    


class Membro(models.Model):
    nome = models.CharField(max_length=200)
    data_nascimento = models.DateField("Data de nascimento")
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    github = models.ForeignKey(UsuarioGithub, on_delete=models.SET_NULL, null=True, blank=True)
    linkedin = models.CharField(max_length=200, null=True, blank=True)
    lattes = models.CharField(max_length=200, null=True, blank=True)
    grupo = models.CharField(max_length=100, blank=True, null=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.nome
