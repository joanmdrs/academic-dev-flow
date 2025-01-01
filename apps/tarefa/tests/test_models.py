from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.release.models import Release
from apps.tarefa.models import CategoriaTarefa
from apps.tarefa.models import Tarefa, IntervaloTempo
from django.core.exceptions import ValidationError
from datetime import datetime, timedelta

class TarefaModelTest(TestCase):
    
    def setUp(self):
        
        self.projeto = Projeto.objects.create(
            nome="Projeto de Exemplo", 
            data_inicio='2024-08-17', 
            data_termino='2024-08-30'
        )
        
        self.membro = Membro.objects.create(
            nome="Membro de teste", 
            data_nascimento='2000-12-11', 
            email='membro.teste@email.com'
        )
        
        self.membro_projeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
                
        self.iteracao = Iteracao.objects.create(
            nome="Iteração Teste", data_inicio='2024-08-01', data_termino='2024-08-30')
        
        self.categoria = CategoriaTarefa.objects.create(nome="Categoria de teste", cor="#00BFFF")
                
        self.tarefa = Tarefa.objects.create(
            nome='Tarefa Teste',
            descricao="Descrição da tarefa",
            data_inicio="2024-08-01",
            data_termino="2024-08-05",
            status="pendente",
            projeto=self.projeto,
            iteracao=self.iteracao,
            categoria=self.categoria
        )

        self.tarefa.membros.add(self.membro_projeto)
        
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

    def test_criacao_tarefa(self):
        self.assertEqual(self.tarefa.nome, 'Tarefa Teste')
        self.assertEqual(self.tarefa.descricao, 'Descrição da tarefa')
        self.assertEqual(self.tarefa.data_inicio, '2024-08-01')
        self.assertEqual(self.tarefa.data_termino, '2024-08-05')
        self.assertEqual(self.tarefa.status, 'pendente')
        self.assertEqual(self.tarefa.projeto, self.projeto)
        self.assertEqual(self.tarefa.iteracao, self.iteracao)
        self.assertEqual(self.tarefa.categoria, self.categoria)
    
    def test_relacionamento_membro_projeto(self):
        self.assertEqual(self.tarefa.projeto.nome, 'Projeto de Exemplo')
        self.assertEqual(self.membro_projeto.membro.nome, 'Membro de teste')

    def test_relacionamento_iteracao(self):
        self.assertEqual(self.tarefa.iteracao.nome, 'Iteração Teste')

    def test_relacionamento_categoria(self):
        self.assertEqual(self.tarefa.categoria.nome, 'Categoria de teste')
        self.assertEqual(self.tarefa.categoria.cor, '#00BFFF')
        
    def test_datas_validas(self):
        self.assertTrue(self.tarefa.data_inicio <= self.tarefa.data_termino)
            
    def test_exclusao_em_cascata(self):
        self.projeto.delete()
        with self.assertRaises(Tarefa.DoesNotExist):
            Tarefa.objects.get(id=self.tarefa.id)
            
    def test_validacao_campos_obrigatorios(self):
        tarefa = Tarefa(
            nome=None,  # Nome é obrigatório
            descricao="Tarefa sem nome",
            data_inicio="2024-08-01",
            data_termino="2024-08-05",
            status="pendente",
            projeto=self.projeto,
            iteracao=self.iteracao,
            categoria=self.categoria
        )
        with self.assertRaises(ValidationError):
            tarefa.full_clean()
            
    def test_queryset_tarefas_pendentes(self):
        pendentes = Tarefa.objects.filter(status='pendente')
        self.assertIn(self.tarefa, pendentes)
    
    def test_iniciar_contagem_tempo(self):
        """Testa a iniciação da contagem de tempo para uma tarefa."""
        self.tarefa.iniciar_contagem_tempo(self.membro_projeto)  # Use MembroProjeto aqui
        ultimo_intervalo = IntervaloTempo.objects.last()
        self.assertEqual(ultimo_intervalo.tipo, 'inicio')
        self.assertEqual(ultimo_intervalo.tarefa, self.tarefa)
        self.assertEqual(ultimo_intervalo.membro_projeto, self.membro_projeto)  # Use MembroProjeto aqui
        self.assertEqual(self.tarefa.status, 'andamento')

    def test_parar_contagem_tempo(self):
        """Testa a parada da contagem de tempo e o cálculo do tempo gasto."""
        self.tarefa.iniciar_contagem_tempo(self.membro_projeto)  # Use MembroProjeto aqui
        intervalo_inicio = self.tarefa.intervalos.filter(tipo='inicio').latest('data_hora')
        
        # Simula uma pausa
        pausa_data = timezone.now() + timedelta(minutes=5)
        with self.modify_time(pausa_data):
            self.tarefa.parar_contagem_tempo(self.membro_projeto)  # Use MembroProjeto aqui
        
        intervalo_pausa = self.tarefa.intervalos.filter(tipo='pausa').latest('data_hora')
        
        tempo_decorrido = intervalo_pausa.data_hora - intervalo_inicio.data_hora
        tempo_decorrido_segundos = tempo_decorrido.total_seconds()
        
        self.assertGreater(self.tarefa.tempo_gasto, 0)
        self.assertAlmostEqual(self.tarefa.tempo_gasto, tempo_decorrido_segundos, delta=1)
        
    def test_calcular_tempo_decorrido(self):
        inicio = datetime.now()
        fim = inicio + timedelta(minutes=30)
        tempo_decorrido = self.tarefa.calcular_tempo_decorrido(inicio, fim)
        self.assertEqual(tempo_decorrido, 1800)  # 30 minutos em segundos

    def test_tempo_total_formatado(self):
        self.tarefa.tempo_gasto = 7260  # 2 horas e 1 minuto em segundos
        tempo_formatado = self.tarefa.tempo_total_formatado()
        self.assertEqual(tempo_formatado, "2h 1min")

    
    def test_estado_contagem_tempo(self):
        """Testa o estado da contagem de tempo."""
        self.tarefa.iniciar_contagem_tempo(self.membro_projeto)  # Use MembroProjeto aqui
        self.assertTrue(self.tarefa.estado_contagem_tempo())
        
        self.tarefa.parar_contagem_tempo(self.membro_projeto)  # Use MembroProjeto aqui
        self.assertFalse(self.tarefa.estado_contagem_tempo())
        
    ### Testando o model de Categoria 
    
    def test_criacao_categoria_tarefa(self):
        self.assertEqual(self.categoria.nome, 'Categoria de teste')
        self.assertEqual(self.categoria.cor, '#00BFFF')
    
    def test_validacao_campos_obrigatorios(self):
        categoria = CategoriaTarefa(
            nome=None,  # Nome é obrigatório
            cor=None
        )
        with self.assertRaises(ValidationError):
            categoria.full_clean()

        
    ### Testando o Model IntervaloTempo
    
    def test_criar_intervalo_tempo(self):
        intervalo = IntervaloTempo.objects.create(
            tipo='inicio',
            membro_projeto=self.membro_projeto,
            tarefa=self.tarefa
        )
        self.assertEqual(intervalo.tipo, 'inicio')
        self.assertIsNotNone(intervalo.data_hora)
        self.assertEqual(intervalo.membro_projeto, self.membro_projeto)
        self.assertEqual(intervalo.tarefa, self.tarefa)

    def test_tipo_invalido(self):
        with self.assertRaises(ValidationError):
            intervalo = IntervaloTempo(
                tipo='invalido',  # Valor não permitido
                membro_projeto=self.membro_projeto,
                tarefa=self.tarefa
            )
            intervalo.full_clean()  # Validação explícita
            
    def test_str_representation(self):
        intervalo = IntervaloTempo.objects.create(
            tipo='inicio',
            membro_projeto=self.membro_projeto,
            tarefa=self.tarefa
        )
        self.assertEqual(str(intervalo), f"Intervalo de inicio para a tarefa {self.tarefa.nome}")

    def test_relacionamento_tarefa(self):
        intervalo1 = IntervaloTempo.objects.create(
            tipo='inicio',
            membro_projeto=self.membro_projeto,
            tarefa=self.tarefa
        )
        intervalo2 = IntervaloTempo.objects.create(
            tipo='pausa',
            membro_projeto=self.membro_projeto,
            tarefa=self.tarefa
        )
        intervalos = IntervaloTempo.objects.all()
        self.assertIn(intervalo1, intervalos)
        self.assertIn(intervalo2, intervalos)
        self.assertEqual(intervalos.count(), 2)
