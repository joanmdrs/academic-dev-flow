from django.db import models
from apps.projeto.models import Projeto
from apps.membro.models import Membro

class MembroProjeto(models.Model):

    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    membro = models.ForeignKey(Membro, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.membro}"
        

class FuncaoMembroProjeto(models.Model):
    
    STATUS_CHOICES = [
        ('membro', 'Membro'),
        ('lider', 'Líder de Projeto'),
        ('desenvolvedor', 'Desenvolvedor de Software'),
        ('desenvolvedor_frontend', 'Desenvolvedor Front-End'),
        ('desenvolvedor_backend', 'Desenvolvedor Back-End'),
        ('desenvolvedor_fullstack', 'Desenvolvedor Full-Stack'),
        ('analista', 'Analista de Sistemas'),
        ('testador', 'Engenheiro de Testes'),
        ('design', 'Designer de UI/UX'),
        ('arquiteto', 'Arquiteto de Software'),
        ('scrum_master', 'Scrum Master'),
        ('product_owner', 'Product Owner'),
        ('dba', 'Administrador de Banco de Dados'),
        ('devops', 'Engenheiro DevOps'),
        ('analista_seguranca', 'Analista de Segurança'),
        ('analista_requisitos', 'Analista de Requisitos'),
        ('integrador', 'Integrador de Sistemas'),
    ]
    
    membro_projeto = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE)
    funcao = models.CharField(choices=STATUS_CHOICES, null=True, blank=True, default="membro")
    data_inicio = models.DateTimeField(auto_now_add=True)
    data_termino = models.DateTimeField(null=True, blank=True)