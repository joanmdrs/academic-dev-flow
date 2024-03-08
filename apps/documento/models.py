from django.db import models

class Documento(models.Model):
    
    titulo = models.CharField(max_length=255)
    conteudo_markdown = MarkdownxField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

    def __unicode__(self):
        return 
