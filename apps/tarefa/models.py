from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao
from apps.tipo.models import Tipo

class Tarefa(models.Model):
    
    STATUS_CHOICES = [
        ('criada', 'Criada'),
        ('andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
        ('atrasada', 'Atrasada'),
        ('bloqueada', 'Bloqueada')
    ]
    
    nome = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_inicio = models.DateField(null=True, blank=True)
    data_termino = models.DateField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='criada')
    descricao = models.TextField(null=True, blank=True)
    concluida = models.BooleanField(default=False)
    tempo_gasto = models.IntegerField(default=0)
    id_issue = models.IntegerField(null=True, blank=True)
    number_issue = models.IntegerField(null=True, blank=True)
    tipo = models.ForeignKey(Tipo, on_delete=models.SET_NULL, null=True, blank=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    membros = models.ManyToManyField(MembroProjeto)
    iteracao = models.ForeignKey(Iteracao, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nome
    
class IntervaloTempo(models.Model):
    
    INTERVALO_CHOICES = [
        ('inicio', 'Início'),
        ('pausa', 'Pausa'),
    ]

    tipo = models.CharField(choices=INTERVALO_CHOICES, max_length=10)
    data_hora = models.DateTimeField(auto_now_add=True)
    membro_projeto = models.ForeignKey(MembroProjeto, on_delete=models.CASCADE, null=True)
    tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE, related_name='intervalos')
    
    def __str__(self):
        return f"Intervalo de {self.tipo} para a tarefa {self.tarefa.nome}"

