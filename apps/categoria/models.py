from django.db import models

class Categoria(models.Model):

    nome = models.CharField(max_length=40)
    descricao = models.TextField(max_length=200, null=True, blank=True)
    cor = models.CharField(max_length=7)

    def __str__(self):
        return self.nome
