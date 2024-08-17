from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.usuario.models import Usuario
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from apps.fluxo_etapa.models import FluxoEtapa
from apps.fluxo_etapa.serializers import FluxoEtapaSerializer

class FluxoEtapaViewsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste", descricao="Descrição do Fluxo Teste")
        self.etapa = Etapa.objects.create(nome="Etapa Teste", descricao="Descrição da Etapa Teste")
        self.fluxo_etapa = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa)
        
        self.new_etapa = Etapa.objects.create(nome="Nova etapa", descricao="Descrição da nova etapa")

    def test_cadastrar_fluxo_etapa(self):
        """Testa a criação de FluxoEtapa com dados válidos."""
        url = reverse('fluxo_etapa:cadastrar_fluxo_etapa')
        data = {
            'etapas': [
                {'fluxo': self.fluxo.id, 'etapa': self.etapa.id}
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_buscar_fluxo_etapa_pelo_id_fluxo(self):
        """Testa a recuperação de FluxoEtapa pelo ID do Fluxo."""
        url = reverse('fluxo_etapa:buscar_fluxo_etapa_pelo_id_fluxo', args=[self.fluxo.id])
        response = self.client.get(url)
        response_data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_data), 1)

    def test_atualizar_etapa_fluxo(self):
        """Testa a atualização de uma FluxoEtapa existente."""
        url = reverse('fluxo_etapa:atualizar_etapa_fluxo', args=[self.fluxo_etapa.id])
        data = {'etapa': self.new_etapa.id}  # Dados para atualizar a etapa
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['etapa'], self.new_etapa.id)

    # def test_excluir_etapa_fluxo(self):
    #     """Testa a exclusão de FluxoEtapa associada a um Fluxo e Etapas."""
    #     url = reverse('fluxo_etapa:excluir_etapa_fluxo')
    #     # Monta os parâmetros da URL
        
    #     params = {
    #         'id_fluxo': self.fluxo.id,
    #         'ids_etapas[]': list(self.etapa.id)
    #     }
    #     print(params)
    #     response = self.client.delete(url, data=params, content_type='application/x-www-form-urlencoded')
    #     print(response.data)
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     # Verifica se a exclusão foi realizada
    #     self.assertFalse(FluxoEtapa.objects.filter(fluxo=self.fluxo, etapa=self.etapa).exists())
        
    def test_excluir_etapa_fluxo_no_params(self):
        """Testa a exclusão com parâmetros ausentes."""
        url = reverse('fluxo_etapa:excluir_etapa_fluxo')
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Ausência de parâmetros')

    def test_excluir_etapa_fluxo_no_objects(self):
        """Testa a exclusão quando não há objetos para excluir."""
        url = reverse('fluxo_etapa:excluir_etapa_fluxo')
        data = {'id_fluxo': self.fluxo.id, 'ids_etapas[]': [9999]}  # ID inválido
        response = self.client.delete(url, data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Ausência de parâmetros')
