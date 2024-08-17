from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from apps.usuario.models import Usuario
from apps.membro.models import Membro, UsuarioGithub
from apps.usuario.serializers import UsuarioSerializer
from apps.membro.serializers import MembroSerializer, UsuarioGithubSerializer

class MembroViewTests(APITestCase):
    def setUp(self):
        # Setup data for testing
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)


        self.usuario_github = UsuarioGithub.objects.create(
            nome='GitHub User',
            email_github='githubuser@example.com',
            usuario_github='githubuser'
        )
        
        self.usuario = Usuario.objects.create(
            username='usuario',
            password='password'
        )
        self.group = Group.objects.create(name='Discentes')
        self.usuario.groups.add(self.group)
        
        self.membro = Membro.objects.create(
            nome='Test Membro',
            data_nascimento='1990-01-01',
            telefone='123456789',
            email='testmembro@example.com',
            linkedin='linkedin.com/testmembro',
            lattes='lattes.com/testmembro',
            grupo='Discentes',
            usuario=self.usuario,
            github=self.usuario_github
        )
        
        self.cadastrar_url = reverse('membro:cadastrar_membro')
        self.buscar_por_nome_url = reverse('membro:buscar_membro_pelo_nome')
        self.buscar_por_grupo_url = reverse('membro:buscar_membro_por_nome_e_grupo')
        self.buscar_pelo_id_url = reverse('membro:buscar_membro_pelo_id', args=[self.membro.id])
        self.buscar_pelo_user_url = reverse('membro:buscar_membro_pelo_user', args=[self.usuario.id])
        self.excluir_url = reverse('membro:excluir_membro', args=[self.membro.id])
        self.atualizar_url = reverse('membro:atualizar_membro', args=[self.membro.id])
        self.listar_por_ids_url = reverse('membro:listar_membros_por_lista_ids')

    def test_cadastrar_membro(self):
        data = {
            'grupo': 'Discentes',
            'usuario': {
                'username': 'newuser',
                'password': 'newpassword'
            },
            'github': {
                'nome': 'New GitHub User',
                'email_github': 'newgithubuser@example.com',
                'usuario_github': 'newgithubuser'
            },
            'membro': {
                'nome': 'New Membro',
                'data_nascimento': '2000-01-01',
                'telefone': '987654321',
                'email': 'newmembro@example.com',
                'linkedin': 'linkedin.com/newmembro',
                'lattes': 'lattes.com/newmembro',
                'grupo': 'Discentes'
            }
        }
        response = self.client.post(self.cadastrar_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Membro.objects.count(), 2)

    def test_buscar_membros_por_nome(self):
        response = self.client.get(self.buscar_por_nome_url, {'nome': 'Test Membro'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Membro')

    def test_buscar_membro_por_grupo(self):
        response = self.client.get(self.buscar_por_grupo_url, {'grupo': 'Discentes'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Membro')

    def test_buscar_membro_por_id(self):
        response = self.client.get(self.buscar_pelo_id_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Membro')

    def test_buscar_membro_pelo_user(self):
        response = self.client.get(self.buscar_pelo_user_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Membro')

    def test_excluir_membro(self):
        response = self.client.delete(self.excluir_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Membro.objects.count(), 0)

    def test_atualizar_membro(self):
        data = {
            'membro': {
                'nome': 'Updated Membro'
            },
            'usuario': {
                'username': 'newuser',
                'password': 'newpassword'
            },
        }
        response = self.client.patch(self.atualizar_url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.membro.refresh_from_db()
        self.assertEqual(self.membro.nome, 'Updated Membro')

    def test_listar_membros_por_lista_ids(self):
        response = self.client.get(self.listar_por_ids_url, {'ids[]': [self.membro.id]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Membro')
