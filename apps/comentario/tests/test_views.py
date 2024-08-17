from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from datetime import datetime, timedelta, timezone
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.tarefa.models import Tarefa
from apps.artefato.models import Artefato
from apps.comentario.models import ComentarioTarefa, ComentarioArtefato
from apps.comentario.serializers import ComentarioTarefaSerializer, ComentarioArtefatoSerializer

class ComentarioViewsTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.projeto = Projeto.objects.create(
            nome="Projeto Exemplo", 
            data_inicio='2024-08-17', 
            data_fim='2024-08-30'
        )
        self.membro = Membro.objects.create(
            nome="Membro teste", 
            data_nascimento='2000-12-11', 
            telefone='(84)99999-9999'
        )
        self.membroProjeto = MembroProjeto.objects.create(
            membro=self.membro, 
            projeto=self.projeto
        )
        self.tarefa = Tarefa.objects.create(
            nome='Tarefa Teste', 
            descricao='Descrição da Tarefa'
        )
        self.artefato = Artefato.objects.create(
            nome='Artefato Teste', 
            descricao='Descrição do Artefato'
        )
        self.comentario_tarefa = ComentarioTarefa.objects.create(
            texto='Comentário na Tarefa',
            autor=self.membroProjeto,
            tarefa=self.tarefa,
            data_hora=datetime.now(timezone.utc)  # Define a data e hora no formato UTC
        )
        self.comentario_artefato = ComentarioArtefato.objects.create(
            texto='Comentário no Artefato',
            autor=self.membroProjeto,
            artefato=self.artefato,
            data_hora=datetime.now(timezone.utc)  # Define a data e hora no formato UTC
        )
        
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_cadastrar_comentario_tarefa(self):
        url = reverse('comentario:cadastrar_comentario_para_a_tarefa')
        data = {
            'texto': 'Novo Comentário',
            'autor': self.membroProjeto.id,
            'tarefa': self.tarefa.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ComentarioTarefa.objects.count(), 2)
        self.assertEqual(ComentarioTarefa.objects.latest('id').texto, 'Novo Comentário')

    def test_buscar_comentario_tarefa_pelo_id(self):
        url = reverse('comentario:buscar_comentario_da_tarefa_pelo_id', args=[self.comentario_tarefa.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        serializer = ComentarioTarefaSerializer(self.comentario_tarefa)
        self.assertEqual(data, serializer.data)

    def test_atualizar_comentario_tarefa(self):
        url = reverse('comentario:atualizar_comentario_da_tarefa', args=[self.comentario_tarefa.id])
        data = {'texto': 'Texto Atualizado'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comentario_tarefa.refresh_from_db()
        self.assertEqual(self.comentario_tarefa.texto, 'Texto Atualizado')

    def test_excluir_comentario_tarefa(self):
        url = reverse('comentario:excluir_comentario_da_tarefa', args=[self.comentario_tarefa.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ComentarioTarefa.objects.count(), 0)

    def test_listar_comentarios_por_tarefa(self):
        url = reverse('comentario:filtrar_comentarios_por_tarefa', args=[self.tarefa.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

        expected_data = {
            'id': self.comentario_tarefa.id,
            'texto': 'Comentário na Tarefa',
            'data_hora': self.comentario_tarefa.data_hora.isoformat(),  # Usar o formato ISO
            'comentario_pai': None,
            'autor': self.membroProjeto.membro.id,
            'nome_autor': self.membro.nome
        }

        # Verificar se o comentário esperado está na resposta
        comentario_encontrado = next((item for item in data if item['id'] == expected_data['id']), None)
        
        self.assertIsNotNone(comentario_encontrado)
        self.assertEqual(comentario_encontrado['texto'], expected_data['texto'])
        self.assertEqual(comentario_encontrado['comentario_pai'], expected_data['comentario_pai'])
        self.assertEqual(comentario_encontrado['autor'], expected_data['autor'])
        self.assertEqual(comentario_encontrado['nome_autor'], expected_data['nome_autor'])
        self.assertAlmostEqual(
            datetime.fromisoformat(comentario_encontrado['data_hora'].replace('Z', '+00:00')),
            datetime.fromisoformat(expected_data['data_hora'].replace('Z', '+00:00')),
            delta=timedelta(seconds=1)
        )

    def test_cadastrar_comentario_artefato(self):
        url = reverse('comentario:cadastrar_comentario_para_o_artefato')
        data = {
            'texto': 'Novo Comentário Artefato',
            'autor': self.membroProjeto.id,
            'artefato': self.artefato.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ComentarioArtefato.objects.count(), 2)
        self.assertEqual(ComentarioArtefato.objects.latest('id').texto, 'Novo Comentário Artefato')

    def test_buscar_comentario_artefato_pelo_id(self):
        url = reverse('comentario:buscar_comentario_do_artefato_pelo_id', args=[self.comentario_artefato.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        serializer = ComentarioArtefatoSerializer(self.comentario_artefato)
        self.assertEqual(data, serializer.data)

    def test_atualizar_comentario_artefato(self):
        url = reverse('comentario:atualizar_comentario_do_artefato', args=[self.comentario_artefato.id])
        data = {'texto': 'Texto Atualizado Artefato'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comentario_artefato.refresh_from_db()
        self.assertEqual(self.comentario_artefato.texto, 'Texto Atualizado Artefato')

    def test_excluir_comentario_artefato(self):
        url = reverse('comentario:excluir_comentario_do_artefato', args=[self.comentario_artefato.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ComentarioArtefato.objects.count(), 0)

    def test_listar_comentarios_por_artefato(self):
        url = reverse('comentario:filtrar_comentarios_por_artefato', args=[self.artefato.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

        expected_data = {
            'id': self.comentario_artefato.id,
            'texto': 'Comentário no Artefato',
            'data_hora': self.comentario_artefato.data_hora.isoformat(),  # Usar o formato ISO
            'comentario_pai': None,
            'autor': self.membroProjeto.membro.id,
            'nome_autor': self.membro.nome
        }

        # Verificar se o comentário esperado está na resposta
        comentario_encontrado = next((item for item in data if item['id'] == expected_data['id']), None)
        
        self.assertIsNotNone(comentario_encontrado)
        self.assertEqual(comentario_encontrado['texto'], expected_data['texto'])
        self.assertEqual(comentario_encontrado['comentario_pai'], expected_data['comentario_pai'])
        self.assertEqual(comentario_encontrado['autor'], expected_data['autor'])
        self.assertEqual(comentario_encontrado['nome_autor'], expected_data['nome_autor'])
        self.assertAlmostEqual(
            datetime.fromisoformat(comentario_encontrado['data_hora'].replace('Z', '+00:00')),
            datetime.fromisoformat(expected_data['data_hora'].replace('Z', '+00:00')),
            delta=timedelta(seconds=1)
        )
