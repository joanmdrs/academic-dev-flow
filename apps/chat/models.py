from django.db import models
from apps.projeto.models import Projeto
from django.conf import settings

class Chat(models.Model):
    nome = models.CharField(max_length=255)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


class Mensagem(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='mensagens')
    autor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        null=True,
        related_name='mensagens_criadas'
    )
    conteudo = models.TextField(max_length=500)
    enviado_em = models.DateTimeField(auto_now_add=True)
    editado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.conteudo
