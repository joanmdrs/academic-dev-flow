from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao
from apps.categoria.models import Categoria

# class Label(models.Model):
#     id_github = models.CharField()
#     nome = models.CharField()
#     cor = models.CharField()
#     projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    
#     def __str__(self):
#         return self.nome

class Tarefa(models.Model):
    
    STATUS_CHOICES = [
        ('criada', 'Criada'),
        ('andamento', 'Em Andamento'),
        ('revisao', 'Em Revisão'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
    ]
    
    nome = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_inicio = models.DateField(null=True, blank=True)
    data_termino = models.DateField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='criada')
    descricao = models.TextField(null=True, blank=True)
    concluida = models.BooleanField(default=False)
    tempo_gasto = models.IntegerField(default=0)
    id_issue = models.BigIntegerField(null=True, blank=True)
    number_issue = models.IntegerField(null=True, blank=True)
    url_issue = models.URLField(null=True, blank=True)
    # labels = models.ManyToManyField(Label)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    membros = models.ManyToManyField(MembroProjeto, blank=True)
    iteracao = models.ForeignKey(Iteracao, on_delete=models.CASCADE, null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
    def iniciar_contagem_tempo(self, membro_projeto):
        ultimo_intervalo = self.intervalos.last()
        
        if not ultimo_intervalo or ultimo_intervalo.tipo == 'pausa':
            if self.status == 'criada':
                self.status = 'andamento'
                self.save()
                
            IntervaloTempo.objects.create(tipo='inicio', tarefa=self, membro_projeto=membro_projeto)

    def parar_contagem_tempo(self, membro_projeto):
        ultimo_intervalo = self.intervalos.last()
        
        if ultimo_intervalo and ultimo_intervalo.tipo == 'inicio':
            IntervaloTempo.objects.create(tipo='pausa', tarefa=self, membro_projeto=membro_projeto)
            intervalo_inicio = self.intervalos.filter(tipo='inicio').latest('data_hora')
            intervalo_pausa = self.intervalos.filter(tipo='pausa').latest('data_hora')
            tempo_decorrido = intervalo_pausa.data_hora - intervalo_inicio.data_hora

            tempo_decorrido_segundos = tempo_decorrido.total_seconds()
        
            self.tempo_gasto += tempo_decorrido_segundos
            self.save()
            
    def estado_contagem_tempo(self):
        ultimo_intervalo = self.intervalos.last()

        if ultimo_intervalo and ultimo_intervalo.tipo == 'inicio':
            return True
        elif not ultimo_intervalo or ultimo_intervalo.tipo == 'pausa':
            return False

    
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

