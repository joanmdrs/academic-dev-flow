from django.db import models

class Membro(models.Model):
    
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=20)
    data_nascimento = models.DateField("Data de nascimento")
    sexo = models.CharField(max_length=20)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    



    
