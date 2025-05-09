from django.db import models
from apps.membro.models import Membro
from django.conf import settings

class Feedback(models.Model):
    TIPOS = [
        ('sugestao', 'Sugestão'),
        ('reclamacao', 'Reclamação'),
        ('bug', 'Bug'),
        ('nova_funcionalidade', 'Nova Funcionalidade'),
        ('melhoria_funcionalidade', 'Melhoria de Funcionalidade'),
        ('experiencia_usuario', 'Experiência do Usuário'),
        ('duvida_uso', 'Dúvida sobre o uso'),
        ('problema_acessibilidade', 'Problemas de Acessibilidade')
        
    ]
    
    STATUS = [
        ('pendente', 'Pendente'),
        ('em_analise', 'Em Análise'),
        ('resolvido', 'Resolvido'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    tipo = models.CharField(choices=TIPOS)
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