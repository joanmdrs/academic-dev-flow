from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from apps.usuario.models import Usuario
from apps.membro.models import Membro

class MembroViewTests(APITestCase):
    def setUp(self):
        # Setup data for testing
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
    
        self.grupo = Group.objects.create(name='TestGroup')
        
        self.usuario = {
            "username": "usuario",
            "password": "senha"
        }
                
        self.membro = {
            "nome": "Membro de teste",
            "data_nascimento": "2000-12-11",
            "sexo": "M",
            "telefone": "123456789",
            "email": "membro.teste@email.com",
            "linkedin": "https://linkedin.com/in/membro",
            "lattes": "https://lattes.com/membro",
            "nome_github": "membro-teste",
            "email_github": "github.membro@email.com",
            "usuario_github": "membro-github",
            "grupo": self.grupo.id,
            "avatar": 1
        }
        
        self.user1 = Usuario.objects.create(username="alice@email.com", password="senha")
        self.user2 = Usuario.objects.create(username="bob@email.com", password="senha")
        self.user3 = Usuario.objects.create(username="carlos@email.com", password="senha")

        
        self.membro1 = Membro.objects.create(
            nome="Alice", email="alice@email.com", usuario=self.user1, grupo=self.grupo)
        self.membro2 = Membro.objects.create(
            nome="Bob", email="bob@email.com", usuario=self.user2, grupo=self.grupo)
        self.membro3 = Membro.objects.create(
            nome="Carlos", email="carlos@email.com", usuario=self.user3, grupo=self.grupo)
        
        ### Urls
        self.cadastrar_membro_url = reverse('membro:cadastrar_membro')
        self.atualizar_membro_url = reverse('membro:atualizar_membro')
        self.buscar_membro_por_nome_url = reverse('membro:buscar_membro_por_nome')
        self.buscar_membro_por_id_url = reverse('membro:buscar_membro_por_id')
        self.buscar_membro_por_usuario_url = reverse('membro:buscar_membro_por_usuario')
        self.listar_membros_url = reverse('membro:listar_membros')
        self.listar_grupos_de_usuario_url = reverse('membro:listar_grupos_de_usuario')
        self.excluir_membro_url = reverse('membro:excluir_membro')
        
    def test_cadastrar_membro_com_sucesso(self):
        """Teste de cadastro bem-sucedido de um membro."""
        payload = {
            "usuario": self.usuario,
            "membro": self.membro
        }

        response = self.client.post(self.cadastrar_membro_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Usuario.objects.count(), 5)
        self.assertEqual(Membro.objects.count(), 4)
        self.assertEqual(response.data['nome'], self.membro['nome'])
    
    def test_cadastrar_membro_usuario_ja_existente(self):
        """Teste de erro ao tentar cadastrar com um nome de usuário já existente."""
        Usuario.objects.create_user(**self.usuario)

        payload = {
            "usuario": self.usuario,
            "membro": self.membro
        }

        response = self.client.post(self.cadastrar_membro_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("O nome de usuário já está sendo utilizado!", response.data["error"])
        self.assertEqual(Usuario.objects.count(), 5)
        self.assertEqual(Membro.objects.count(), 3)
        
    def test_cadastrar_membro_sem_nome(self):
        """Teste de erro com dados inválidos para o membro."""
        self.membro["nome"] = None

        payload = {
            "usuario": self.usuario,
            "membro": self.membro
        }

        response = self.client.post(self.cadastrar_membro_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("O campo nome não pode ser vazio!", response.data["error"])
        self.assertEqual(Usuario.objects.count(), 4)
        self.assertEqual(Membro.objects.count(), 3)
        
    def test_atualizar_membro_dados_validos(self):
        # Dados válidos para atualizar membro e usuário
        data = {
            "membro": {"nome": "Novo Nome", "grupo": self.grupo.id},
            "usuario": {"username": "newuser", "password": "newpassword123"}
        }
        
        usuario_teste = Usuario.objects.create(
            username="membro01@email.com",
            password="senha",
        )
        
        membro_teste = Membro.objects.create(
            nome="Membro 01",
            data_nascimento="2000-12-11",
            sexo="M",
            telefone="123456789",
            email="membro01@email.com",
            linkedin="https://linkedin.com/in/membro",
            lattes="https://lattes.com/membro",
            nome_github="membro-01",
            email_github="github.membro01@email.com",
            usuario_github="membro01-github",
            usuario=usuario_teste,
            grupo=self.grupo,
            avatar=1
        )

        response = self.client.patch(f'{self.atualizar_membro_url}?id_membro={membro_teste.id}', data, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifica se os dados foram atualizados
        membro_teste.refresh_from_db()
        self.assertEqual(membro_teste.nome, "Novo Nome")

        usuario_teste.refresh_from_db()
        self.assertEqual(usuario_teste.username, "newuser")
        self.assertTrue(usuario_teste.check_password("newpassword123"))
        
    def test_atualizar_membro_com_dados_invalidos(self):
        # Dados inválidos (grupo inexistente)
        data = {
            "membro": {"nome": "Novo Nome", "grupo": 999},
            "usuario": {"username": "newuser", "password": "newpassword123"}
        }
        
        usuario_teste = Usuario.objects.create(
            username="membro01@email.com",
            password="senha",
        )
        
        membro_teste = Membro.objects.create(
            nome="Membro 01",
            data_nascimento="2000-12-11",
            sexo="M",
            telefone="123456789",
            email="membro01@email.com",
            linkedin="https://linkedin.com/in/membro",
            lattes="https://lattes.com/membro",
            nome_github="membro-01",
            email_github="github.membro01@email.com",
            usuario_github="membro01-github",
            usuario=usuario_teste,
            grupo=self.grupo,
            avatar=1
        )

        response = self.client.patch(f'{self.atualizar_membro_url}?id_membro={membro_teste.id}', data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Verifica que os dados não foram alterados
        membro_teste.refresh_from_db()
        self.assertNotEqual(membro_teste.nome, "Novo Nome")
        
    def test_atualizar_membro_sem_dados_usuario(self):
        # Dados faltando informações do usuário
        data = {
            "membro": {"nome": "Novo Nome", "grupo": self.grupo.id},
        }
        
        usuario_teste = Usuario.objects.create(
            username="membro01@email.com",
            password="senha",
        )
        
        membro_teste = Membro.objects.create(
            nome="Membro 01",
            data_nascimento="2000-12-11",
            sexo="M",
            telefone="123456789",
            email="membro01@email.com",
            linkedin="https://linkedin.com/in/membro",
            lattes="https://lattes.com/membro",
            nome_github="membro-01",
            email_github="github.membro01@email.com",
            usuario_github="membro01-github",
            usuario=usuario_teste,
            grupo=self.grupo,
            avatar=1
        )

        response = self.client.patch(f'{self.atualizar_membro_url}?id_membro={membro_teste.id}', data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Verifica que os dados do membro e do usuário não foram alterados
        membro_teste.refresh_from_db()
        self.assertNotEqual(membro_teste.nome, "Novo Nome")
        
    def test_atualizar_membro_inexistente(self):
        # Tenta atualizar um membro inexistente
        data = {
            "membro": {"nome": "Novo Nome", "grupo": self.grupo.id},
            "usuario": {"username": "newuser", "password": "newpassword123"}
        }

        response = self.client.patch(f'{self.atualizar_membro_url}?id_membro={9999}', data, format="json")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'Membro matching query does not exist.')
        
    def test_buscar_membros_por_nome(self):
        # Testa busca com um nome parcial
        response = self.client.get(self.buscar_membro_por_nome_url, {'nome': 'Ali'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifica se o membro correto foi encontrado
        resultados = response.data['results']
        self.assertEqual(len(resultados), 1)
        self.assertEqual(resultados[0]['nome'], "Alice")
        
    def test_buscar_membros_sem_parametro_nome(self):
        # Testa busca sem o parâmetro "nome"
        response = self.client.get(self.buscar_membro_por_nome_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifica se todos os membros foram retornados
        resultados = response.data['results']
        self.assertEqual(len(resultados), 3)

        nomes = [resultado['nome'] for resultado in resultados]
        self.assertIn("Alice", nomes)
        self.assertIn("Bob", nomes)
        self.assertIn("Carlos", nomes)

    def test_buscar_membros_por_nome_sem_resultados(self):
        # Testa busca com um nome que não existe
        response = self.client.get(self.buscar_membro_por_nome_url, {'nome': 'Zebra'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Nenhum membro encontrado.")
        self.assertEqual(len(response.data['results']), 0)
        
    def test_buscar_membro_por_id_com_sucesso(self):
        # Testa a busca de um membro por ID com sucesso
        response = self.client.get(self.buscar_membro_por_id_url, {'id_membro': self.membro1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.membro1.nome)
        
    def test_buscar_membro_por_id_nao_fornecido(self):
        # Testa a busca de membro sem fornecer o ID
        response = self.client.get(self.buscar_membro_por_id_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "ID do membro não fornecido")
        
    def test_buscar_membro_por_id_inexistente(self):
        # Testa a busca de um membro com ID inexistente
        response = self.client.get(self.buscar_membro_por_id_url, {'id_membro': 999})
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("matching query does not exist", response.data['error'])
        
    def test_buscar_membro_por_id_usuario_com_sucesso(self):
        # Testa a busca do membro pelo ID do usuário com sucesso
        response = self.client.get(self.buscar_membro_por_usuario_url, {'id_usuario': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.membro1.nome)
        
    def test_buscar_membro_por_id_usuario_nao_fornecido(self):
        # Testa a busca do membro sem fornecer o ID do usuário
        response = self.client.get(self.buscar_membro_por_usuario_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "ID do usuário não fornecido")
        
    def test_buscar_membro_por_id_usuario_inexistente(self):
        # Testa a busca de um membro com um ID de usuário inexistente
        response = self.client.get(self.buscar_membro_por_usuario_url, {'id_usuario': 999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Membro não encontrado")
        
    def test_listar_membros_com_sucesso(self):
        # Testa a listagem de membros com sucesso
        response = self.client.get(self.listar_membros_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['nome'], self.membro1.nome)
        self.assertEqual(response.data[1]['nome'], self.membro2.nome)
    
    def test_listar_membros_sem_membros(self):
        # Remove todos os membros e testa o cenário de lista vazia
        Membro.objects.all().delete()

        response = self.client.get(self.listar_membros_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['error'], 'Membro não encontrados!')
        
    def test_listar_grupos_com_sucesso(self):
        # Testa a listagem bem-sucedida de grupos
        response = self.client.get(self.listar_grupos_de_usuario_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        grupos_retornados = response.data
        self.assertEqual(len(grupos_retornados), 1)
        self.assertEqual(grupos_retornados[0]['name'], self.grupo.name)
        
    def test_listar_grupos_vazio(self):
        # Remove todos os grupos e testa o cenário de lista vazia
        Group.objects.all().delete()

        response = self.client.get(self.listar_grupos_de_usuario_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
        
    def test_excluir_membro_com_sucesso(self):
        # Testa a exclusão de um membro com sucesso
        response = self.client.delete(f"{self.excluir_membro_url}?id_membro={self.membro1.id}")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Verifica que o membro e o usuário associados foram excluídos
        self.assertFalse(Membro.objects.filter(id=self.membro1.id).exists())
        self.assertFalse(Usuario.objects.filter(id=self.user1.id).exists())
        
    def test_excluir_membro_id_nao_fornecido(self):
        # Testa a tentativa de exclusão sem fornecer o ID do membro
        response = self.client.delete(self.excluir_membro_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'ID do membro não fornecido')
    
    def test_excluir_membro_nao_existente(self):
        # Testa a exclusão de um membro inexistente
        response = self.client.delete(f"{self.excluir_membro_url}?id_membro=999")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("matching query does not exist", str(response.data['error']))
        
    