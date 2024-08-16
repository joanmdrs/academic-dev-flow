from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.tipo.models import Tipo
from apps.tipo.serializers import TipoSerializer
from apps.usuario.models import Usuario  # Importar o modelo de usuário personalizado

class TipoTests(APITestCase):
    def setUp(self):
        # Criação de um usuário autenticado para os testes usando o modelo personalizado
        self.user = Usuario.objects.create_user(username='admin', password='password123')
        self.client.force_authenticate(user=self.user)

        # Criação de um Tipo para testes
        self.tipo = Tipo.objects.create(nome='Tipo Teste', cor='#FFFFFF')
        self.url_cadastrar = reverse('tipo:cadastrar_tipo')
        self.url_buscar = reverse('tipo:buscar_tipo_pelo_nome')
        self.url_atualizar = reverse('tipo:atualizar_tipo', kwargs={'id': self.tipo.id})
        self.url_excluir = reverse('tipo:excluir_tipo', kwargs={'id': self.tipo.id})
        self.url_listar = reverse('tipo:listar_tipos')

    def test_cadastrar_tipo(self):
        data = {'nome': 'Novo Tipo', 'cor': '#000000'}
        response = self.client.post(self.url_cadastrar, data, format='json')
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome'], 'Novo Tipo')
        self.assertEqual(response.data['cor'], '#000000')

    def test_buscar_tipo_pelo_nome(self):
        response = self.client.get(self.url_buscar, {'nome': 'Tipo Teste'})
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Tipo Teste')

    def test_atualizar_tipo(self):
        data = {'nome': 'Tipo Atualizado'}
        response = self.client.patch(self.url_atualizar, data, format='json')
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], 'Tipo Atualizado')

    def test_excluir_tipo(self):
        response = self.client.delete(self.url_excluir)
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Tipo.objects.filter(id=self.tipo.id).exists())

    def test_listar_tipos(self):
        response = self.client.get(self.url_listar)
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Verifica se há pelo menos um Tipo na resposta
        self.assertEqual(response.data[0]['nome'], 'Tipo Teste')
        
    def test_atualizar_tipo_inexistente(self):
        url_atualizar_inexistente = reverse('tipo:atualizar_tipo', kwargs={'id': 9999})
        data = {'nome': 'Tipo Inexistente'}
        response = self.client.patch(url_atualizar_inexistente, data, format='json')
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_excluir_tipo_inexistente(self):
        url_excluir_inexistente = reverse('tipo:excluir_tipo', kwargs={'id': 9999})
        response = self.client.delete(url_excluir_inexistente)
        print(response.data)  # Adicionado para depuração
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
