from django.db import models
from apps.membro_projeto.models import MembroProjeto
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao
from apps.categoria.models import Categoria

class CategoriaTarefa(models.Model): 
    
    nome = models.CharField(max_length=40)
    descricao = models.TextField(max_length=200, null=True, blank=True)
    cor = models.CharField(max_length=7)

    def __str__(self):
        return self.nome

class Tarefa(models.Model):
    
    STATUS_CHOICES = [
        ('criada', 'Criada'),
        ('andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
    ]
    
    nome = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_inicio = models.DateField(null=True, blank=True)
    data_termino = models.DateField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='criada')
    tempo_gasto = models.IntegerField(default=0)
    id_issue = models.BigIntegerField(null=True, blank=True)
    number_issue = models.IntegerField(null=True, blank=True)
    url_issue = models.URLField(null=True, blank=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, null=True, blank=True)
    membros = models.ManyToManyField(MembroProjeto, blank=True)
    iteracao = models.ForeignKey(Iteracao, on_delete=models.CASCADE, null=True, blank=True)
    categoria = models.ForeignKey(CategoriaTarefa, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
    def iniciar_contagem_tempo(self, membro_projeto):
        """Inicia a contagem de tempo se a tarefa estiver pausada ou não tiver intervalos."""
        ultimo_intervalo = self.intervalos.last()

        if not ultimo_intervalo or ultimo_intervalo.tipo == 'pausa':
            if self.status == 'criada':
                self.status = 'andamento'
                self.save()

            intervalo = IntervaloTempo.objects.create(tipo='inicio', tarefa=self, membro_projeto=membro_projeto)
            return intervalo
        return None

    def parar_contagem_tempo(self, membro_projeto):
        """Pausa a contagem de tempo e calcula o tempo gasto."""
        ultimo_intervalo = self.intervalos.last()

        if ultimo_intervalo and ultimo_intervalo.tipo == 'inicio':
            intervalo_pausa = IntervaloTempo.objects.create(tipo='pausa', tarefa=self, membro_projeto=membro_projeto)
            tempo_decorrido = self.calcular_tempo_decorrido(ultimo_intervalo.data_hora, intervalo_pausa.data_hora)

            self.tempo_gasto += tempo_decorrido
            self.save()
            return intervalo_pausa
        return None

    def calcular_tempo_decorrido(self, inicio, fim):
        """Calcula o tempo decorrido entre dois intervalos."""
        tempo_decorrido = fim - inicio
        return int(tempo_decorrido.total_seconds())

    def estado_contagem_tempo(self):
        """Verifica se a tarefa está com a contagem de tempo ativa."""
        ultimo_intervalo = self.intervalos.last()

        if ultimo_intervalo and ultimo_intervalo.tipo == 'inicio':
            return True
        elif not ultimo_intervalo or ultimo_intervalo.tipo == 'pausa':
            return False

    def tempo_total_formatado(self):
        """Converte o tempo total gasto em um formato legível (horas, minutos)."""
        horas, resto = divmod(self.tempo_gasto, 3600)
        minutos, _ = divmod(resto, 60)
        return f"{horas}h {minutos}min"
    
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

