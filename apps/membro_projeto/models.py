from django.db import models
from apps.projeto.models import Projeto
from apps.membro.models import Membro

class MembroProjeto(models.Model):
    
    STATUS_CHOICES = [
        ('gerente', 'Gerente de Projeto'),
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
    
    
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE)
    membro = models.ForeignKey(Membro, on_delete=models.CASCADE)
    funcao = models.CharField(max_length=40, choices=STATUS_CHOICES, null=True, blank=True, default="À definir")
    
    def __str__(self):
        return f"{self.membro}"
    
    def save(self, *args, **kwargs):
        if self.pk:
            # Se a instância já existir no banco de dados (atualização)
            historico_anterior = HistoricoMembroProjeto.objects.create(
                membro_projeto=self,
                funcao=MembroProjeto.objects.get(pk=self.pk).funcao
            )

        super().save(*args, **kwargs)  # Salva primeiro para obter um ID atribuído

        # Cria a entrada no histórico após salvar as alterações
        if self.pk:
            historico_atual = HistoricoMembroProjeto.objects.create(
                membro_projeto=self,
                funcao=self.funcao
            )
        
class HistoricoMembroProjeto(models.Model):
    membro_projeto = models.ForeignKey('MembroProjeto', on_delete=models.CASCADE)
    funcao = models.CharField(max_length=40, choices=MembroProjeto.STATUS_CHOICES)
    data_modificacao = models.DateTimeField(auto_now_add=True)