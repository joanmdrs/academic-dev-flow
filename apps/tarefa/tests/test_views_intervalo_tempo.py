from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.tarefa.models import Tarefa, IntervaloTempo, CategoriaTarefa
from django.contrib.auth.models import Group
from unittest.mock import patch


import django
django.setup()

class IntervaloTempoViewsTest(APITestCase):
    def setUp(self):
        # Cria um usuário para autenticação
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.projeto = Projeto.objects.create(
            nome="Projeto de Exemplo", 
            data_inicio='2024-08-17', 
            data_termino='2024-08-30'
        )
        
        self.grupo = Group.objects.create(name='TestGroup')

        self.usuario = Usuario.objects.create(
            username="membro.teste@email.com",
            password="senha",
        )
        
        self.membro = Membro.objects.create(
            nome="Membro de teste", 
            data_nascimento='2000-12-11', 
            email='membro.teste@email.com',
            usuario=self.usuario,
            grupo=self.grupo
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
        
        ### Urls 
        
        self.iniciar_contagem_url = reverse('tarefa:iniciar_contagem_tempo')
        self.parar_contagem_url = reverse('tarefa:parar_contagem_tempo')
        
    def test_iniciar_contagem_tempo_nao_fornecer_ids(self):
        # Testa o caso em que os IDs não são fornecidos na requisição
        response = self.client.post(self.iniciar_contagem_url, data={}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID da Tarefa ou o ID do MembroProjeto não foram fornecidos')
        
    def test_iniciar_contagem_tempo_membro_projeto_nao_encontrado(self):
        # Testa o caso em que o MembroProjeto não é encontrado
        invalid_id = 9999
        response = self.client.post(self.iniciar_contagem_url, data={'id_membro_projeto': invalid_id, 'id_tarefa': self.tarefa.id}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'No MembroProjeto matches the given query.')
        
    def test_nao_iniciar_contagem_tempo(self):
        # Testa o caso onde não é possível iniciar a contagem de tempo
        # Aqui vamos garantir que o método `iniciar_contagem_tempo` retorne None
        with patch('apps.tarefa.models.Tarefa.iniciar_contagem_tempo', return_value=None):
            response = self.client.post(self.iniciar_contagem_url, data={'id_membro_projeto': self.membro_projeto.id, 'id_tarefa': self.tarefa.id}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Não foi possível iniciar a contagem de tempo.')

    def test_iniciar_contagem_tarefa_nao_encontrada(self):
        # Testa o caso em que a Tarefa não é encontrada
        invalid_id = 9999
        response = self.client.post(self.iniciar_contagem_url, data={'id_membro_projeto': self.membro_projeto.id, 'id_tarefa': invalid_id}, format='json')

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'No Tarefa matches the given query.')
        
    def test_parar_contagem_tempo_com_sucesso(self):
        # Simula o comportamento da função `parar_contagem_tempo` e cria o intervalo
        intervalo = IntervaloTempo.objects.create(membro_projeto=self.membro_projeto, tarefa=self.tarefa, tipo='inicio')
        
        data = {'id_membro_projeto': self.membro_projeto.id, 'id_tarefa': self.tarefa.id}
        response = self.client.post(self.parar_contagem_url, data=data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('id', response.data)  # Verifica se o intervalo foi retornado com o ID
        self.assertEqual(response.data['membro_projeto'], self.membro_projeto.id)
    
    def test_parar_contagem_tempo_membro_projeto_nao_encontrado(self):
        # Testa o caso em que o MembroProjeto não é encontrado
        invalid_id = 9999
        data = {'id_membro_projeto': invalid_id, 'id_tarefa': self.tarefa.id}
        response = self.client.post(self.parar_contagem_url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'No MembroProjeto matches the given query.')
        
    def test_parar_contagem_tempo_tarefa_nao_encontrada(self):
        # Testa o caso em que a Tarefa não é encontrada
        invalid_id = 9999
        data = {'id_membro_projeto': self.membro_projeto.id, 'id_tarefa': invalid_id}
        response = self.client.post(self.parar_contagem_url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'No Tarefa matches the given query.')
        
    def test_parar_contagem_tempo_sem_dados(self):
        # Testa o caso em que os dados não são fornecidos
        data = {}
        response = self.client.post(self.parar_contagem_url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID da Tarefa ou o ID do MembroProjeto não foram fornecidos')
    
    def test_parar_contagem_tempo_sem_intervalo(self):
        # Testa o caso em que o intervalo não foi iniciado para o membro e tarefa
        data = {'id_membro_projeto': self.membro_projeto.id, 'id_tarefa': self.tarefa.id}
        response = self.client.post(self.parar_contagem_url, data=data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Não foi possível parar a contagem de tempo.')
