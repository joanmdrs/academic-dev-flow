from rest_framework import status
from rest_framework.test import APITestCase
from apps.tarefa.models import Tag  # Substitua pelo caminho correto do modelo Tag
from django.urls import reverse
from rest_framework.test import APIClient
from apps.usuario.models import Usuario

class TagViewsTests(APITestCase):

    def setUp(self):
        # Cria um usuário para autenticação
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

        self.dados_validos = {
            'nome': 'Tag Teste',
            'cor': '#33FF57'
        }
        self.dados_invalidos = {
            'nome': '',  
            'cor': '#33FF57'
        }
        
        self.tag = Tag.objects.create(nome="Tag Existente", cor="#FF5733")

        # URLs
        self.cadastrar_tag_url = reverse('tags:cadastrar_tag')
        self.atualizar_tag_url = reverse('tags:atualizar_tag')
        self.buscar_tags_pelo_nome_url = reverse('tags:buscar_tag_pelo_nome')
        self.buscar_tag_pelo_id_url = reverse('tags:buscar_tag_pelo_id')
        self.listar_tags_url = reverse('tags:listar_tags')
        self.excluir_tags_url = reverse('tags:excluir_tags')

    def test_criar_tag_com_sucesso(self):
        # Testa a criação de uma tag com dados válidos
        response = self.client.post(self.cadastrar_tag_url, data=self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome'], self.dados_validos['nome'])
        self.assertEqual(response.data['cor'], self.dados_validos['cor'])

    def test_criar_tag_com_nome_existente(self):
        # Testa a criação de uma tag com nome já existente
        response = self.client.post(self.cadastrar_tag_url, data={'nome': 'Tag Existente', 'cor': '#000000'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Já existe uma tag com esse nome.')
        self.assertEqual(response.data['code'], 'TAG_EXISTENTE')

    def test_criar_tag_com_dados_invalidos(self):
        # Testa a criação de uma tag com dados inválidos (nome vazio)
        response = self.client.post(self.cadastrar_tag_url, data=self.dados_invalidos, format='json')        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(
            response.data["error"],
            "{'nome': [ErrorDetail(string='Este campo não pode ser em branco.', code='blank')]}"
        )
        
    def test_atualizar_tag_com_sucesso(self):
        # Testa a atualização de uma tag com dados válidos
        self.dados_tag_atualizar = {
            "nome": "Tag Atualizada"
        }
        response = self.client.patch(
            f"{self.atualizar_tag_url}?id_tag={self.tag.id}", data=self.dados_tag_atualizar, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.tag.refresh_from_db()
        self.assertEqual(response.data['nome'], self.tag.nome)
        
    def test_atualizar_tag_com_nome_existente(self):
        # Testa a tentativa de atualizar a tag com um nome já existente
        response = self.client.patch(
            f"{self.atualizar_tag_url}?id_tag={self.tag.id}", 
            data={'nome': 'Tag Existente', 'cor': '#000000'}, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Já existe uma tag com esse nome.')
        self.assertEqual(response.data['code'], 'TAG_EXISTENTE')
        
    def test_atualizar_tag_sem_id(self):
        # Testa a tentativa de atualizar uma tag sem fornecer o ID
        response = self.client.patch(
            f"{self.atualizar_tag_url}",
            data={'nome': 'Novo Nome'}, 
            format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID da tag não foi fornecido!')
        
    def test_atualizar_tag_nao_encontrada(self):
        # Testa a tentativa de atualizar uma tag que não existe
        response = self.client.patch(
            f"{self.atualizar_tag_url}?id_tag=9999",
            data={'nome': 'Tag Inexistente'}, 
            format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'Tag matching query does not exist.')
        
    def test_buscar_tags_pelo_nome_com_sucesso(self):
        # Testa a busca por uma tag com o nome 'Tag 1'
        response = self.client.get(self.buscar_tags_pelo_nome_url, {'nome_tag': 'Tag'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
        self.assertIn('Tag', response.data[0]['nome'])
        
    def test_buscar_todas_as_tags(self):
        # Testa a busca sem fornecer o nome da tag, retornando todas as tags
        response = self.client.get(self.buscar_tags_pelo_nome_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 

    def test_buscar_tags_sem_resultados(self):
        # Testa a busca por um nome que não retorna resultados
        response = self.client.get(self.buscar_tags_pelo_nome_url, {'nome_tag': 'Outra tag'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, []) 
        
    def test_buscar_tag_pelo_id_com_sucesso(self):
        # Testa a busca de uma tag pelo ID
        response = self.client.get(self.buscar_tag_pelo_id_url, {'id_tag': self.tag.id})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.tag.nome)
        self.assertEqual(response.data['cor'], self.tag.cor)
        self.assertEqual(response.data['descricao'], self.tag.descricao)
        
    def test_buscar_tag_pelo_id_tag_nao_encontrada(self):
        # Testa a busca de uma tag que não existe
        id_invalido = 9999  # Um ID que não existe
        response = self.client.get(self.buscar_tag_pelo_id_url, {'id_tag': id_invalido})
        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], 'Tag matching query does not exist.')
        
    def test_buscar_tag_pelo_id_sem_id(self):
        # Testa a requisição sem fornecer o ID da tag
        response = self.client.get(self.buscar_tag_pelo_id_url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID da tag não foi fornecido!')
        
    def test_listar_tags_com_sucesso(self):
        # Testa a listagem de todas as tags
        self.tag1 = Tag.objects.create(nome="Tag 1", cor="#FF5733", descricao="Tag de teste 1")
        self.tag2 = Tag.objects.create(nome="Tag 2", cor="#33FF57", descricao="Tag de teste 2")
        
        response = self.client.get(self.listar_tags_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3) 
        self.assertEqual(response.data[1]['nome'], self.tag1.nome)
        self.assertEqual(response.data[2]['nome'], self.tag2.nome)
        
    def test_listar_tags_sem_tags(self):
        # Testa a listagem quando não há tags no banco de dados
        Tag.objects.all().delete()  
        response = self.client.get(self.listar_tags_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, []) 
        
    def test_excluir_tags_com_sucesso(self):
        # Testa a exclusão de tags com IDs válidos
        self.tag1 = Tag.objects.create(nome="Tag 1", cor="#FF5733", descricao="Tag de teste 1")
        self.tag2 = Tag.objects.create(nome="Tag 2", cor="#33FF57", descricao="Tag de teste 2")
        self.valid_ids = [self.tag1.id, self.tag2.id]
        response = self.client.delete(self.excluir_tags_url, data={'ids_tags': self.valid_ids}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, {'message': 'Tagas excluídas com sucesso !'})
        self.assertEqual(Tag.objects.count(), 1)
        
    def test_excluir_tags_sem_ids(self):
        # Testa a exclusão quando não são fornecidos IDs de tags
        response = self.client.delete(self.excluir_tags_url, data={}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    def test_excluir_tags_com_ids_invalidos(self):
        # Testa a exclusão com IDs inválidos
        self.ids_invalidos = [9999, 1000]
        response = self.client.delete(self.excluir_tags_url, data={'ids_tags': self.ids_invalidos}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)