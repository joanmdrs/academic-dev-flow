from django.db import models
from apps.membro.models import Membro
from django.conf import settings

class Feedback(models.Model):
    TIPOS = [
        ('sugestao', 'Sugestão'),
        ('reclamacao', 'Reclamação'),
    ]
    
    STATUS = [
        ('pendente', 'Pendente'),
        ('em_analise', 'Em Análise'),
        ('resolvido', 'Resolvido'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    tipo = models.CharField(max_length=10, choices=TIPOS)
    status = models.CharField(max_length=15, choices=STATUS, default='pendente')
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='feedbacks_criados'
    )


    def __str__(self):
        return f"{self.get_tipo_display()} - {self.titulo}"