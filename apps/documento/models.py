from django.db import models
from markdownx.models import MarkdownxField
from apps.projeto.models import Projeto
from apps.artefato.models import Artefato

class Documento(models.Model):
    
    STATUS_CHOICES = [
        ('rascunho', 'Em rascunho'),
        ('revisao', 'Pendente de revisão'),
        ('aprovado', 'Aprovado'),
    ]
    
    titulo = models.CharField(max_length=255)
    # conteudo_markdown = MarkdownxField()
    url = models.URLField(null=True, blank=True)
    status = models.CharField(max_length=40, choices=STATUS_CHOICES, null=True, blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    artefato = models.ForeignKey(Artefato, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.titulo
