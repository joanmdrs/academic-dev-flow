from django.db import models
from apps.usuario.models import Usuario
from django.contrib.auth.models import Group 

class Membro(models.Model):
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('O', 'Outro'),  # Opcional para incluir uma terceira opção
    ]

    nome = models.CharField(max_length=200)
    data_nascimento = models.DateField("Data de nascimento", null=True, blank=True)
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, default='O')  # Novo campo sexo
    telefone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=200)
    linkedin = models.CharField(max_length=200, null=True, blank=True)
    lattes = models.CharField(max_length=200, null=True, blank=True)
    nome_github = models.CharField(max_length=200, blank=True, null=True)
    email_github = models.EmailField(max_length=200, blank=True, null=True)
    usuario_github = models.CharField(max_length=200, blank=True, null=True, unique=True) 
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True)
    grupo = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True) 
    avatar = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.nome
