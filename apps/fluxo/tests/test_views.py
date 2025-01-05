from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usuario.models import Usuario
from apps.fluxo.models import Fluxo
from django.contrib.auth.models import Group

class FluxoViewsTest(APITestCase):
    def setUp(self):
        # Criar um usuário autenticado
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.fluxo1 = Fluxo.objects.create(nome="Fluxo 01", descricao="Descrição do fluxo 01")
        self.fluxo2 = Fluxo.objects.create(nome="Fluxo 02", descricao="Descrição do fluxo 02")
        self.fluxo3 = Fluxo.objects.create(nome="Fluxo 03", descricao="Descrição do fluxo 03")
        
        self.valid_payload = {
            "nome": "Fluxo teste",
            "descricao": "Descrição do fluxo teste"
        }
        
        self.invalid_payload = {
            "nome": None
        }
        
        ### Urls
        self.cadastrar_fluxo_url = reverse('fluxo:cadastrar_fluxo')
        self.atualizar_fluxo_url = reverse('fluxo:atualizar_fluxo')
        self.buscar_fluxo_pelo_id_url = reverse('fluxo:buscar_fluxo_pelo_id')
        self.buscar_fluxo_pelo_nome_url = reverse('fluxo:buscar_fluxo_pelo_nome')
        self.listar_fluxos_url = reverse('fluxo:listar_fluxos')
        self.excluir_fluxo_url = reverse('fluxo:excluir_fluxo')
        

    def test_cadastrar_fluxo_com_sucesso(self):
        """Testa se a criação de um fluxo com dados válidos funciona corretamente"""
        response = self.client.post(self.cadastrar_fluxo_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.valid_payload['nome'])
        self.assertEqual(response.data['descricao'], self.valid_payload['descricao'])
        self.assertTrue(Fluxo.objects.filter(nome='Fluxo teste').exists())

    def test_cadastrar_fluxo_campo_nome_invalido(self):
        """Testa se a criação de um fluxo com dados inválidos retorna erro"""
        response = self.client.post(self.cadastrar_fluxo_url, self.invalid_payload, format='json')  
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(response.data['error'], "O campo nome é obrigatório para a criação do fluxo.")

    def test_cadastrar_fluxo_sem_dados(self):
        """Testa a criação de um fluxo sem passar os dados"""
        response = self.client.post(self.cadastrar_fluxo_url)  
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Os dados do fluxo não foram fornecidos na Request.')
        
    def test_cadastrar_fluxo_usuario_nao_autenticado(self):
        """Teste a criação quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.post(self.cadastrar_fluxo_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_atualizar_fluxo_com_sucesso(self):
        """Testa se a atualização de um fluxo com dados válidos funciona corretamente"""
        valid_payload = {
            'nome': 'Fluxo Atualizado',
            'descricao': 'Descrição atualizada'
        }
        response = self.client.patch(
            f'{self.atualizar_fluxo_url}?id_fluxo={self.fluxo1.id}', 
            valid_payload, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], valid_payload['nome'])
        self.assertEqual(response.data['descricao'], valid_payload['descricao'])
        self.fluxo1.refresh_from_db()
        self.assertEqual(self.fluxo1.nome, 'Fluxo Atualizado')
        self.assertEqual(self.fluxo1.descricao, 'Descrição atualizada')
        
    def test_atualizar_fluxo_dados_invalidos(self):
        """Testa se a atualização de um fluxo com dados inválidos retorna erro"""
        invalid_payload = {
            'nome': ""  
        }
        response = self.client.patch(
            f'{self.atualizar_fluxo_url}?id_fluxo={self.fluxo1.id}', 
            invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(
            response.data['error'], "{'nome': [ErrorDetail(string='Este campo não pode ser em branco.', code='blank')]}")
        
    def test_atualizar_fluxo_id_nao_fornecido(self):
        """Testa se a atualização sem fornecer o ID do fluxo retorna erro"""
        response = self.client.patch(self.atualizar_fluxo_url, self.valid_payload) 
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID fluxo não foi fornecido.')
        
    def test_atualizar_fluxo_nao_encontrado(self):
        """Testa se a atualização de um fluxo que não existe retorna erro"""
        response = self.client.patch(f'{self.atualizar_fluxo_url}?id_fluxo=999', self.valid_payload)  # ID inexistente
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Fluxo não localizado.')
        
    def test_atualizar_fluxo_usuario_nao_autenticado(self):
        """Testa se a atualização de um fluxo com dados válidos funciona corretamente"""
        valid_payload = {
            'nome': 'Fluxo Atualizado',
            'descricao': 'Descrição atualizada'
        }
        self.client.logout()
        response = self.client.patch(
            f'{self.atualizar_fluxo_url}?id_fluxo={self.fluxo1.id}', 
            valid_payload, 
            format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_fluxo_pelo_id_com_sucesso(self):
        """Testa se a busca por um fluxo existente pelo ID funciona corretamente."""
        response = self.client.get(f'{self.buscar_fluxo_pelo_id_url}?id_fluxo={self.fluxo1.id}')  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.fluxo1.nome)
        self.assertEqual(response.data['descricao'], self.fluxo1.descricao)
        
    def test_buscar_fluxo_id_nao_fornecido(self):
        """Testa se a busca sem fornecer o ID do fluxo retorna erro."""
        response = self.client.get(self.buscar_fluxo_pelo_id_url)  
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do fluxo não foi fornecido.')
        
    def test_buscar_fluxo_por_id_nao_existente(self):
        """Testa se a busca por um fluxo com ID inexistente retorna erro."""
        response = self.client.get(f'{self.buscar_fluxo_pelo_id_url}?id_fluxo={999}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Fluxo não localizado.')
        
    def test_buscar_fluxo_por_id_usuario_nao_autenticado(self):
        """Testa se um usuário não autenticado recebe erro ao tentar buscar um fluxo."""
        self.client.logout()  
        response = self.client.get(f'{self.buscar_fluxo_pelo_id_url}?id_fluxo={self.fluxo1.id}') 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_fluxo_pelo_nome_parcial(self):
        """Testa se a busca por fluxos com nome parcial retorna resultados corretos."""
        response = self.client.get(f'{self.buscar_fluxo_pelo_nome_url}?nome_fluxo=Fluxo')  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 3)
        self.assertEqual(response.data['results'][0]['nome'], self.fluxo1.nome)
        
    def test_buscar_fluxo_pelo_nome_sem_parametros(self):
        """Testa se a busca sem nome retorna todos os fluxos."""
        response = self.client.get(self.buscar_fluxo_pelo_nome_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 3)
        
    def test_buscar_fluxo_nome_nao_encontrado(self):
        """Testa se a busca por um nome que não existe retorna mensagem apropriada."""
        response = self.client.get(f'{self.buscar_fluxo_pelo_nome_url}?nome_fluxo=inexistente')  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Nenhum fluxo encontrado')
        self.assertEqual(len(response.data['results']), 0)
        
    def test_buscar_fluxo_pelo_nome_usuario_nao_autenticado(self):
        """Testa a busca quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(f'{self.buscar_fluxo_pelo_nome_url}?nome_fluxo=Fluxo')  
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_com_sucesso(self):
        """Testa se todos os fluxos são listados corretamente."""
        response = self.client.get(self.listar_fluxos_url)  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['nome'], self.fluxo1.nome)
        self.assertEqual(response.data[1]['nome'], self.fluxo2.nome)
        self.assertEqual(response.data[2]['nome'], self.fluxo3.nome)
        
    def test_listar_fluxos_sem_fluxos(self):
        """Testa se a resposta é uma lista vazia quando não há fluxos no banco de dados."""
        Fluxo.objects.all().delete()
        response = self.client.get(self.listar_fluxos_url)  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
        
    def test_listar_fluxos_usuario_nao_autenticado(self):
        """Testa se um usuário não autenticado recebe erro ao tentar listar fluxos."""
        self.client.logout() 
        response = self.client.get(self.listar_fluxos_url) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_fluxo_com_sucesso(self):
        """Testa a exclusão de um fluxo existente."""
        response = self.client.delete(f'{self.excluir_fluxo_url}?id_fluxo={self.fluxo1.id}') 
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Fluxo.objects.filter(id=self.fluxo1.id).exists()) 
        
    def test_excluir_fluxo_inexistente(self):
        """Testa a tentativa de excluir um fluxo que não existe."""
        response = self.client.delete(f'{self.excluir_fluxo_url}?id_fluxo=9999')  
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Fluxo não localizado.')
        
    def test_excluir_fluxo_sem_id(self):
        """Testa a exclusão de fluxo sem fornecer o ID."""
        response = self.client.delete(self.excluir_fluxo_url)  
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O ID do fluxo não foi fornecido.')
        
    def test_excluir_fluxo_usuario_nao_autenticado(self):
        """Testa se um usuário não autenticado não consegue excluir um fluxo."""
        self.client.logout()  # Deslogar o usuário
        response = self.client.delete(f'{self.excluir_fluxo_url}?id_fluxo={self.fluxo1.id}')  
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


        
        
    
        
        
    