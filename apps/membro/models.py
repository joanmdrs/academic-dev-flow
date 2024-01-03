from django.db import models

class Membro(models.Model):
    
    STATUS_CHOICES = (
        ('masculino', 'Masculino'),
        ('feminino', 'Feminino'),
        ('nao_informado', 'Não Informado')
    )
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=14)
    data_nascimento = models.DateField("Data de nascimento")
    sexo = models.CharField(max_length=20, choices=STATUS_CHOICES)
    telefone = models.CharField(max_length=14)
    email = models.EmailField(max_length=200)
    

    
