from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.tipo.models import Tipo
from apps.tarefa.models import Tarefa, IntervaloTempo

class TarefaModelTest(TestCase):
    
    def setUp(self):
        # Configura dados de teste
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.membroProjeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.iteracao = Iteracao.objects.create(nome="Iteração 1", numero=1, data_inicio='2024-08-17', data_termino='2024-08-30')
        self.tipo = Tipo.objects.create(nome='Tipo Teste', cor="#FFFFFF")
        
        self.tarefa = Tarefa.objects.create(
            nome='Tarefa Teste',
            projeto=self.projeto,
            iteracao=self.iteracao,
            tipo=self.tipo
        )
    
    def test_tarefa_creation(self):
        """Testa a criação de uma tarefa."""
        tarefa = Tarefa.objects.get(id=self.tarefa.id)
        self.assertEqual(tarefa.nome, 'Tarefa Teste')
        self.assertEqual(tarefa.projeto, self.projeto)
        self.assertEqual(tarefa.iteracao, self.iteracao)
        self.assertEqual(tarefa.tipo, self.tipo)
    
    def test_iniciar_contagem_tempo(self):
        """Testa a iniciação da contagem de tempo para uma tarefa."""
        self.tarefa.iniciar_contagem_tempo(self.membroProjeto)  # Use MembroProjeto aqui
        ultimo_intervalo = IntervaloTempo.objects.last()
        self.assertEqual(ultimo_intervalo.tipo, 'inicio')
        self.assertEqual(ultimo_intervalo.tarefa, self.tarefa)
        self.assertEqual(ultimo_intervalo.membro_projeto, self.membroProjeto)  # Use MembroProjeto aqui
        self.assertEqual(self.tarefa.status, 'andamento')

    def test_parar_contagem_tempo(self):
        """Testa a parada da contagem de tempo e o cálculo do tempo gasto."""
        self.tarefa.iniciar_contagem_tempo(self.membroProjeto)  # Use MembroProjeto aqui
        intervalo_inicio = self.tarefa.intervalos.filter(tipo='inicio').latest('data_hora')
        
        # Simula uma pausa
        pausa_data = timezone.now() + timedelta(minutes=5)
        with self.modify_time(pausa_data):
            self.tarefa.parar_contagem_tempo(self.membroProjeto)  # Use MembroProjeto aqui
        
        intervalo_pausa = self.tarefa.intervalos.filter(tipo='pausa').latest('data_hora')
        
        tempo_decorrido = intervalo_pausa.data_hora - intervalo_inicio.data_hora
        tempo_decorrido_segundos = tempo_decorrido.total_seconds()
        
        self.assertGreater(self.tarefa.tempo_gasto, 0)
        self.assertAlmostEqual(self.tarefa.tempo_gasto, tempo_decorrido_segundos, delta=1)
    
    def test_estado_contagem_tempo(self):
        """Testa o estado da contagem de tempo."""
        self.tarefa.iniciar_contagem_tempo(self.membroProjeto)  # Use MembroProjeto aqui
        self.assertTrue(self.tarefa.estado_contagem_tempo())
        
        self.tarefa.parar_contagem_tempo(self.membroProjeto)  # Use MembroProjeto aqui
        self.assertFalse(self.tarefa.estado_contagem_tempo())
    
    def modify_time(self, new_time):
        """Context manager para alterar o tempo atual para testes."""
        class TimeMachine:
            def __init__(self, new_time):
                self.new_time = new_time

            def __enter__(self):
                self.original_time = timezone.now()
                timezone.now = lambda: self.new_time

            def __exit__(self, exc_type, exc_value, traceback):
                timezone.now = lambda: self.original_time

        return TimeMachine(new_time)
