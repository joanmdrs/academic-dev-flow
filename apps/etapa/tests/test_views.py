from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.etapa.models import Etapa
from apps.etapa.serializers import EtapaSerializer
from apps.usuario.models import Usuario

class EtapaViewsTests(TestCase):

    def setUp(self):
        # Configuração inicial para os testes
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

        self.etapa = Etapa.objects.create(
            nome='Etapa Teste',
            descricao='Descrição da Etapa Teste'
        )

    def test_cadastrar_etapa(self):
        url = reverse('etapa:cadastrar_etapa')
        data = {
            'nome': 'Nova Etapa',
            'descricao': 'Descrição da Nova Etapa'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Etapa.objects.count(), 2)
        self.assertEqual(Etapa.objects.latest('id').nome, 'Nova Etapa')

    def test_buscar_etapa_pelo_nome(self):
        url = reverse('etapa:buscar_etapa_pelo_nome') + '?nome=Teste'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        serializer = EtapaSerializer(self.etapa)
        self.assertIn(serializer.data, data['results'])

    def test_buscar_etapa_pelo_id(self):
        url = reverse('etapa:buscar_etapa_pelo_id', args=[self.etapa.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        serializer = EtapaSerializer(self.etapa)
        self.assertEqual(data, serializer.data)

    def test_listar_etapas(self):
        url = reverse('etapa:listar_etapas')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        serializer = EtapaSerializer(Etapa.objects.all(), many=True)
        self.assertEqual(data, serializer.data)

    def test_atualizar_etapa(self):
        url = reverse('etapa:atualizar_etapa', args=[self.etapa.id])
        data = {'nome': 'Etapa Atualizada', 'descricao': 'Descrição Atualizada'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.etapa.refresh_from_db()
        self.assertEqual(self.etapa.nome, 'Etapa Atualizada')
        self.assertEqual(self.etapa.descricao, 'Descrição Atualizada')

    def test_excluir_etapa(self):
        url = reverse('etapa:excluir_etapa') + '?ids_etapas[]=' + str(self.etapa.id)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Etapa.objects.count(), 0)
