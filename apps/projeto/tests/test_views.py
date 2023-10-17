from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from apps.projeto.models import Projeto
from apps.projeto.serializers import ProjetoSerializer
from django.utils import timezone
from django.urls import reverse
import json

class ProjetoAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.projeto_data = {'nome': 'Projeto de Teste', 
                             'descricao': 'Descrição do projeto', 
                             'status': 'em_andamento',
                             'data_inicio': '2023-09-23 20:28:00+00',
                             'data_fim': '2023-10-26 20:28:00+00'}

    def test_cadastrar_projeto(self):
        
        url = reverse('cadastrar_projeto')  
        dados_serializados = ProjetoSerializer(data=self.projeto_data)
        
        if (dados_serializados.is_valid(raise_exception=True)): 
            response = self.client.post(url, data=dados_serializados.data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertTrue(Projeto.objects.filter(nome='Projeto de Teste').exists())

        else :
            response = self.client.post(url, data=dados_serializados.data)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        

    def test_buscar_projetos_por_nome(self):
        projeto = Projeto.objects.create(nome = 'Projeto de Teste', 
                            descricao = 'Descrição do projeto', 
                            status = 'Em andamento',
                            data_inicio = timezone.now(),
                            data_fim = timezone.now() + timezone.timedelta(days=30)
        )
        response = self.client.get('/projetos/buscar/', {'name': 'Teste'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)

    def test_excluir_projeto(self):
        projeto = Projeto.objects.create(nome='Projeto a ser excluído',
                                        descricao = 'Descrição do projeto', 
                                        status = 'Em andamento',
                                        data_inicio = timezone.now(),
                                        data_fim = timezone.now() + timezone.timedelta(days=30))
        
        response = self.client.delete(f'/projetos/{projeto.id}/excluir/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Projeto.DoesNotExist):
            Projeto.objects.get(id=projeto.id)

    def test_atualizar_projeto(self):
        projeto = Projeto.objects.create(nome='Projeto Original', 
                                        descricao='Descrição original', 
                                        status='em_andamento',
                                        data_inicio=timezone.now(),
                                        data_fim=timezone.now() + timezone.timedelta(days=30))
            
        updated_data = {
            'id': projeto.id,
            'nome': 'Projeto Atualizado',
            'descricao': 'Nova descrição',
            'status': projeto.status,
            'data_inicio': projeto.data_inicio,
            'data_fim': projeto.data_fim,
        }
        
        dados_serializados = ProjetoSerializer(data=updated_data)
        
        if (dados_serializados.is_valid(raise_exception=True)): 
            response = self.client.patch(f'/projetos/{projeto.id}/atualizar/', data=dados_serializados.data)
            
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            projeto.refresh_from_db()
            self.assertEqual(projeto.nome, 'Projeto Atualizado')
            self.assertEqual(projeto.descricao, 'Nova descrição')

        else :
            
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
