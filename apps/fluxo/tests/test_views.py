from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.fluxo.models import Fluxo
from apps.usuario.models import Usuario

class FluxoViewsTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste", descricao="Descrição do Fluxo Teste")

    def test_cadastrar_fluxo(self):
        url = reverse('fluxo:cadastrar_fluxo')
        data = {
            'nome': 'Novo Fluxo',
            'descricao': 'Descrição do Novo Fluxo'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Fluxo.objects.count(), 2)
        self.assertEqual(Fluxo.objects.get(nome='Novo Fluxo').descricao, 'Descrição do Novo Fluxo')

    def test_buscar_fluxo_pelo_nome(self):
        url = reverse('fluxo:buscar_fluxo_pelo_nome') + '?name_fluxo=Teste'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['nome'], 'Fluxo Teste')

    def test_buscar_fluxo_pelo_id(self):
        url = reverse('fluxo:buscar_fluxo_pelo_id', kwargs={'fluxo_id': self.fluxo.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertEqual(response_data['nome'], 'Fluxo Teste')

    def test_atualizar_fluxo(self):
        url = reverse('fluxo:atualizar_fluxo', kwargs={'fluxo_id': self.fluxo.id})
        data = {
            'nome': 'Fluxo Atualizado',
            'descricao': 'Descrição Atualizada'
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.fluxo.refresh_from_db()
        self.assertEqual(self.fluxo.nome, 'Fluxo Atualizado')
        self.assertEqual(self.fluxo.descricao, 'Descrição Atualizada')

    def test_excluir_fluxo(self):
        url = reverse('fluxo:excluir_fluxo', kwargs={'fluxo_id': self.fluxo.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Fluxo.objects.count(), 0)

    def test_listar_fluxos(self):
        url = reverse('fluxo:listar_fluxos')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['nome'], 'Fluxo Teste')
