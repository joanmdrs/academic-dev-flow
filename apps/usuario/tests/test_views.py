from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usuario.models import Usuario
from django.contrib.auth.models import Group
import django
django.setup()

class UsuarioTests(APITestCase):
    def setUp(self):
        # Criação de um grupo para atribuição nos testes
        self.grupo = Group.objects.create(name='TestGroup')

        # Criação de um usuário autenticado para os testes
        self.user = Usuario.objects.create_user(username='admin', password='password123')
        self.client.force_authenticate(user=self.user)

    def test_cadastrar_usuario(self):
        url = reverse('usuario:cadastrar_usuario')  # Verifique se a URL corresponde ao seu nome de rota
        data = {
            'username': 'new_user',
            'password': 'new_password',
            'grupo': self.grupo.name
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'new_user')

    def test_buscar_usuario_por_id(self):
        usuario = Usuario.objects.create(username="teste", password="teste123")
        url = reverse('usuario:buscar_usuario_pelo_id', kwargs={'id': usuario.id})

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], usuario.username)

    def test_excluir_usuario(self):
        usuario = Usuario.objects.create(username="teste", password="teste123")
        url = reverse('usuario:excluir_usuario', kwargs={'id': usuario.id})

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Usuario.objects.filter(id=usuario.id).exists())

    # def test_atualizar_usuario(self):
    #     usuario = Usuario.objects.create(username="teste", password="teste123")
    #     url = reverse('usuario:atualizar_usuario', kwargs={'id': usuario.id})
        
    #     data = {
    #         'username': 'novo_username'
    #     }
        
    #     response = self.client.patch(url, data, format='json')
        
    #     # Imprima o conteúdo da resposta para ajudar no diagnóstico
    #     print(response.data)

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

