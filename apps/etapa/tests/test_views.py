from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usuario.models import Usuario
from apps.etapa.models import Etapa
from django.contrib.auth.models import Group

class EtapaViewsTest(APITestCase):

    def setUp(self):
        # Criar um usuário autenticado
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.etapa1 = Etapa.objects.create(nome='Etapa 1', descricao='Descrição da etapa 1')
        self.etapa2 = Etapa.objects.create(nome='Etapa 2', descricao='Descrição da etapa 2')
        self.etapa3 = Etapa.objects.create(nome='Etapa 3', descricao='Descrição da etapa 3')
        
        ### Urls 
        self.cadastrar_etapa_url = reverse('etapa:cadastrar_etapa')
        self.atualizar_etapa_url = reverse('etapa:atualizar_etapa')
        self.buscar_etapa_pelo_id_url = reverse('etapa:buscar_etapa_pelo_id')
        self.buscar_etapa_pelo_nome_url = reverse('etapa:buscar_etapa_pelo_nome')
        self.listar_etapas_url = reverse('etapa:listar_etapas')
        self.excluir_etapas_url = reverse('etapa:excluir_etapas')

    def test_criar_etapa_com_sucesso(self):
        """Testa a criação de uma etapa com dados válidos"""
        data = {
            'nome': 'Etapa Teste',
            'descricao': 'Descrição da etapa de teste'
        }
        response = self.client.post(self.cadastrar_etapa_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], 'Etapa Teste')
        self.assertEqual(response.data['descricao'], 'Descrição da etapa de teste')

    def test_criar_etapa_sem_dados(self):
        """Testa a criação de uma etapa sem dados"""
        response = self.client.post(self.cadastrar_etapa_url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Os dados da etapa não foram fornecidos na Request.')

    def test_criar_etapa_nome_invalido(self):
        """Testa a criação de uma etapa sem o campo 'nome'"""
        data = {
            'nome': None,
            'descricao': 'Descrição sem nome'
        }
        response = self.client.post(self.cadastrar_etapa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O campo nome é obrigatório para a criação da etapa.')

    def test_usuario_nao_autenticado(self):
        """Testa a criação de uma etapa por um usuário não autenticado"""
        self.client.logout()
        data = {
            'nome': 'Etapa Teste',
            'descricao': 'Descrição da etapa de teste'
        }
        response = self.client.post(self.cadastrar_etapa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_atualizar_etapa_com_sucesso(self):
        """Testa a atualização da etapa com dados válidos"""
        data = {
            'nome': 'Etapa Atualizada',
            'descricao': 'Descrição atualizada da etapa'
        }
        response = self.client.patch(f'{self.atualizar_etapa_url}?id_etapa={self.etapa1.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], 'Etapa Atualizada')
        self.assertEqual(response.data['descricao'], 'Descrição atualizada da etapa')
        
    def test_atualizar_etapa_sem_id(self):
        """Testa a atualização de uma etapa sem o ID na requisição"""
        data = {
            'nome': 'Etapa Atualizada',
            'descricao': 'Descrição atualizada da etapa'
        }
        response = self.client.patch(self.atualizar_etapa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID da etapa não foi fornecido.')
        
    def test_atualizar_etapa_nao_encontrada(self):
        """Testa a atualização de uma etapa que não existe"""
        data = {
            'nome': 'Etapa Inexistente',
            'descricao': 'Descrição de uma etapa inexistente'
        }
        response = self.client.patch(f'{self.atualizar_etapa_url}?id_etapa={9999}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Etapa não localizada.')
        
    def test_atualizar_etapa_com_dados_invalidos(self):
        """Testa a atualização de uma etapa com dados inválidos (por exemplo, nome muito curto)"""
        data = {
            'nome': "", 
            'descricao': 'Descrição de etapa inválida'
        }
        response = self.client.patch(f'{self.atualizar_etapa_url}?id_etapa={self.etapa1.id}', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(response.data['error'], "{'nome': [ErrorDetail(string='Este campo não pode ser em branco.', code='blank')]}")
        
    def test_usuario_nao_autenticado(self):
        """Testa a atualização de uma etapa por um usuário não autenticado"""
        self.client.logout()
        data = {
            'nome': 'Etapa Atualizada',
            'descricao': 'Descrição atualizada da etapa'
        }
        response = self.client.patch(self.atualizar_etapa_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_etapa_por_id_com_sucesso(self):
        """Testa a busca da etapa com ID válido"""
        response = self.client.get(f'{self.buscar_etapa_pelo_id_url}?id_etapa={self.etapa1.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.etapa1.nome)
        self.assertEqual(response.data['descricao'], self.etapa1.descricao)
        
    def test_buscar_etapa_sem_id(self):
        """Testa a busca de uma etapa sem o ID na requisição"""
        response = self.client.get(self.buscar_etapa_pelo_id_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID da etapa não foi fornecido.')
        
    def test_buscar_etapa_por_id_nao_encontrado(self):
        """Testa a busca de uma etapa que não existe"""
        response = self.client.get(f'{self.buscar_etapa_pelo_id_url}?id_etapa={999}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Etapa não localizada.')
        
    def test_buscar_etapa_por_id_usuario_nao_autenticado(self):
        """Testa a busca da etapa por um usuário não autenticado"""
        self.client.logout()
        response = self.client.get(f'{self.buscar_etapa_pelo_id_url}?id_etapa={self.etapa1.id}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_etapas_com_nome_parcial(self):
        """Testa a busca de etapas filtrando pelo nome com string parcial"""
        response = self.client.get(f'{self.buscar_etapa_pelo_nome_url}?nome_etapa=Etapa')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['nome'], 'Etapa 1')
        
    def test_buscar_etapas_com_nome_inexistente(self):
        """Testa a busca de etapas filtrando pelo nome com string que não existe"""
        response = self.client.get(f'{self.buscar_etapa_pelo_nome_url}?nome_etapa=Inexistente')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_buscar_etapas_sem_nome(self):
        """Testa a busca de todas as etapas sem filtrar pelo nome"""
        response = self.client.get(self.buscar_etapa_pelo_nome_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  

    def test_usuario_nao_autenticado(self):
        """Testa a busca de etapas por um usuário não autenticado"""
        self.client.logout()
        response = self.client.get(f'{self.buscar_etapa_pelo_nome_url}?nome_etapa=Teste')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_etapas_com_sucesso(self):
        """Testa a listagem de todas as etapas"""
        response = self.client.get(self.listar_etapas_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3) 
        
    def test_listar_etapas_sem_etapas(self):
        """Testa a listagem de etapas quando não existem etapas no banco de dados"""
        Etapa.objects.all().delete()  
        response = self.client.get(self.listar_etapas_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_usuario_nao_autenticado(self):
        """Testa a listagem de etapas quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_etapas_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_etapas_com_sucesso(self):
        """Testa a exclusão de múltiplas etapas"""
        
        response = self.client.delete(self.excluir_etapas_url, data={'ids_etapas': [self.etapa1.id, self.etapa2.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Etapa.objects.count(), 1) 
        
    def test_excluir_etapas_sem_ids(self):
        """Testa a exclusão sem fornecer os IDs das etapas"""
        response = self.client.delete(self.excluir_etapas_url, data={}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O IDs das etapas não foram fornecidos.')
        
    def test_excluir_etapas_nao_localizadas(self):
        """Testa a tentativa de exclusão de etapas que não existem"""
        response = self.client.delete(self.excluir_etapas_url, data={'ids_etapas': [999, 1000]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Uma ou mais etapas não foram localizadas.')
    
    def test_excluir_etapas_usuario_nao_autenticado(self):
        """Testa a exclusão de etapas quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.delete(self.excluir_etapas_url, data={'ids_etapas': [self.etapa1.id]})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)