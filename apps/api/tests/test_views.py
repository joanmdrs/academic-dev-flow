from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from apps.membro.models import Membro  
from apps.usuario.models import Usuario 
from django.urls import reverse
from rest_framework.permissions import AllowAny


class LoginViewTestCase(APITestCase):
    
    def setUp(self):
        # Criação de usuário
        self.usuario = Usuario.objects.create_user(
            username='membro.teste@email.com',
            password='testpassword'
        )
        
        # Ativa o usuário
        self.usuario.is_active = True
        self.usuario.is_staff = True
        self.usuario.is_superuser = False
        self.usuario.save()  # Salva o usuário com as configurações alteradas

        # Criação de grupo e associação ao usuário
        self.group = Group.objects.create(name='Test Group')
        self.usuario.groups.add(self.group)
        
        # Criação de membro associado ao usuário
        self.membro = Membro.objects.create(
            nome="Membro de teste",
            email="membro.teste@email.com",
            grupo=self.group,
            usuario=self.usuario,
        )
        
        # Criação de um usuário sem membro associado
        self.usuario_sem_membro = Usuario.objects.create_user(
            username='user_without_member',
            password='password123'
        )
        
        # URL de login
        self.login_url = reverse('api:login')  

    def test_login_com_sucesso(self):
        # Teste quando o login é bem-sucedido
        response = self.client.post(self.login_url, {
            'username': 'membro.teste@email.com',
            'password': 'testpassword'
        })
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['username'], 'membro.teste@email.com')
        self.assertIn('Test Group', response.data['user']['groups'])

    def test_login_com_usuario_sem_membro_associado(self):
        # Teste quando o usuário não está associado a um membro
        response = self.client.post(self.login_url, {
            'username': 'user_without_member',
            'password': 'password123'
        })
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], 'Usuário não está associado a um membro.')
        self.assertEqual(response.data['code'], 'USER_NOT_ASSOCIATED')

    def test_login_com_credenciais_invalidas(self):
        # Teste com credenciais inválidas
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'wrongpassword'
        })
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], 'Credenciais inválidas.')

    def test_login_com_usuario_inexistente(self):
        # Teste com um usuário que não existe
        response = self.client.post(self.login_url, {
            'username': 'nonexistentuser',
            'password': 'password123'
        })
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], 'Credenciais inválidas.')
