from django.db import models

# Create your models here.
class Projeto(models.Model):
    
    STATUS_CHOICES = (
        ('cancelado', 'Cancelado'),
        ('em_andamento', 'Em andamento'),
        ('concluido', 'Concluído')
    )
    
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    data_inicio = models.DateTimeField("Data Início")
    data_fim = models.DateTimeField("Data Fim")

    def __str__(self):
        return self.nome
