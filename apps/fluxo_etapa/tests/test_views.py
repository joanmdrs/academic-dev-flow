from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usuario.models import Usuario
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from apps.fluxo_etapa.models import FluxoEtapa
from django.contrib.auth.models import Group

class FluxoEtapaViewsTest(APITestCase):
    def setUp(self):
        # Criar um usuário autenticado
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.fluxo1 = Fluxo.objects.create(nome='Fluxo 01', descricao='Descrição do fluxo 01')
        self.fluxo2 = Fluxo.objects.create(nome='Fluxo 02', descricao='Descrição do fluxo 02')
        self.fluxo_teste = Fluxo.objects.create(nome='Fluxo de teste', descricao="Descrição do fluxo de teste")
        
        self.etapa1 = Etapa.objects.create(nome='Etapa 01', descricao='Descrição da etapa 01')
        self.etapa2 = Etapa.objects.create(nome='Etapa 02', descricao='Descrição da etapa 02')
        self.etapa3 = Etapa.objects.create(nome='Etapa 03', descricao='Descrição da etapa 03')
        self.etapa4 = Etapa.objects.create(nome='Etapa 04', descricao='Descrição da etapa 04')
        self.etapa_teste = Etapa.objects.create(nome='Etapa de teste', descricao='Descrição da etapa de teste')
        
        self.fluxo_etapa1 = FluxoEtapa.objects.create(fluxo=self.fluxo1, etapa=self.etapa1, created_by=self.user)
        self.fluxo_etapa2 = FluxoEtapa.objects.create(fluxo=self.fluxo1, etapa=self.etapa2, created_by=self.user)
        self.fluxo_etapa3 = FluxoEtapa.objects.create(fluxo=self.fluxo2, etapa=self.etapa3, created_by=self.user)
        self.fluxo_etapa4 = FluxoEtapa.objects.create(fluxo=self.fluxo2, etapa=self.etapa4, created_by=self.user)
        
        self.dados_validos = {
            "fluxo": self.fluxo_teste.id,
            "etapa": self.etapa_teste.id,
            "ordem_no_fluxo": 1,
            "created_by": self.user.id
        }
        
        self.dados_invalidos = {
            "fluxo": None,
            "etapa": None
        }
        
        ### Urls 
        self.cadastrar_fluxo_etapa_url = reverse('fluxo_etapa:cadastrar_fluxo_etapa')
        self.atualizar_fluxo_etapa_url = reverse('fluxo_etapa:atualizar_fluxo_etapa')
        self.buscar_fluxo_etapa_pelo_id_fluxo_url = reverse('fluxo_etapa:buscar_fluxo_etapa_pelo_id_fluxo')
        self.atualizar_fluxo_etapa_url = reverse('fluxo_etapa:atualizar_fluxo_etapa')
        self.excluir_fluxo_etapa_url = reverse('fluxo_etapa:excluir_fluxo_etapa')
        self.listar_fluxo_etapa_url = reverse('fluxo_etapa:listar_fluxo_etapa')
        
    def test_cadastrar_fluxo_etapa_com_dados_validos(self):
        """Testa o cadastro de um FluxoEtapa com dados válidos"""
        response = self.client.post(self.cadastrar_fluxo_etapa_url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        self.assertEqual(response.data["fluxo"], self.fluxo_teste.id)
        self.assertEqual(response.data["etapa"], self.etapa_teste.id)
        self.assertEqual(response.data["ordem_no_fluxo"], self.dados_validos["ordem_no_fluxo"])
        self.assertEqual(response.data["created_by"], self.user.id)
        
    def test_cadastrar_fluxo_etapa_sem_dados(self):
        """Testa o cadastro de um FluxoEtapa sem fornecer dados"""
        response = self.client.post(self.cadastrar_fluxo_etapa_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "Os dados não foram fornecidos na Request.")
        
    def test_cadastrar_fluxo_etapa_com_dados_invalidos(self):
        """Testa o cadastro de um FluxoEtapa com dados inválidos"""
        response = self.client.post(self.cadastrar_fluxo_etapa_url, self.dados_invalidos, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(response.data['error'], "{'fluxo': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')], 'etapa': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}")
        
    def test_cadastrar_fluxo_etapa_usuario_nao_autenticado(self):
        """Testa o cadastro de um FluxoEtapa com um usuário não autenticado"""
        self.client.force_authenticate(user=None)
        response = self.client.post(self.cadastrar_fluxo_etapa_url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn(response.data['detail'], "As credenciais de autenticação não foram fornecidas.")
        
    def test_atualizar_fluxo_etapa_com_dados_validos(self):
        """Testa a atualização de um FluxoEtapa com dados válidos"""
        
        url = f"{self.atualizar_fluxo_etapa_url}?id_fluxo_etapa={self.fluxo_etapa1.id}"
        response = self.client.patch(url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nome_fluxo"], "Fluxo de teste")
        self.assertEqual(response.data["nome_etapa"], "Etapa de teste")
        self.assertEqual(response.data["ordem_no_fluxo"], self.dados_validos["ordem_no_fluxo"])
        
    def test_atualizar_fluxo_etapa_com_dados_invalidos(self):
        """Testa a atualização de um FluxoEtapa com dados inválidos"""
        url = f"{self.atualizar_fluxo_etapa_url}?id_fluxo_etapa={self.fluxo_etapa1.id}"
        response = self.client.patch(url, self.dados_invalidos, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn(response.data['error'], "{'fluxo': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')], 'etapa': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}")
    
    def test_atualizar_fluxo_etapa_sem_id_fluxo_etapa(self):
        """Testa a atualização de um FluxoEtapa sem fornecer o ID do fluxo-etapa"""
        response = self.client.patch(self.atualizar_fluxo_etapa_url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "O ID da ligação fluxo-etapa não foi fornecido.")
        
    def test_atualizar_fluxo_etapa_nao_existente(self):
        """Testa a atualização de um FluxoEtapa inexistente"""
        url = f"{self.atualizar_fluxo_etapa_url}?id_fluxo_etapa=9999"
        response = self.client.patch(url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "Relacionamento fluxo-etapa não localizado.")
        
    def test_atualizar_fluxo_etapa_usuario_nao_autenticado(self):
        """Testa a atualização de um FluxoEtapa sem autenticação"""
        self.client.logout()
        url = f"{self.atualizar_fluxo_etapa_url}?id_fluxo_etapa={self.fluxo_etapa1.id}"
        response = self.client.patch(url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)
        self.assertIn(response.data["detail"], "As credenciais de autenticação não foram fornecidas.")
        
    def test_filtrar_fluxo_etapa_por_fluxo_existente(self):
        """Testa o filtro de FluxoEtapa por um fluxo existente"""
        url = f"{self.buscar_fluxo_etapa_pelo_id_fluxo_url}?id_fluxo={self.fluxo1.id}"
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["fluxo"], self.fluxo1.id)
        self.assertEqual(response.data[1]["fluxo"], self.fluxo1.id)
        
    def test_filtrar_fluxo_etapa_por_fluxo_sem_fluxo_etapas(self):
        """Testa o filtro de FluxoEtapa por um fluxo sem FluxoEtapas"""
        url = f"{self.buscar_fluxo_etapa_pelo_id_fluxo_url}?id_fluxo={self.fluxo_teste.id}"
        
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_filtrar_fluxo_etapa_sem_id_fluxo(self):
        """Testa a tentativa de filtrar sem fornecer o parâmetro id_fluxo"""
        response = self.client.get(self.buscar_fluxo_etapa_pelo_id_fluxo_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "O ID do fluxo não foi fornecido.")
        
    def test_filtrar_fluxo_etapa_por_fluxo_inexistente(self):
        """Testa o filtro de FluxoEtapa por um fluxo existente"""
        url = f"{self.buscar_fluxo_etapa_pelo_id_fluxo_url}?id_fluxo={999}"
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn(response.data['error'], "O ID do fluxo fornecido não corresponde a nenhuma instância de Fluxo.")
        
    def test_filtrar_fluxo_etapa_usuario_nao_autenticado(self):
        """Testa o acesso ao filtro sem autenticação"""
        self.client.force_authenticate(user=None)
        url = f"{self.buscar_fluxo_etapa_pelo_id_fluxo_url}?id_fluxo={self.fluxo1.id}"
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)
        self.assertIn(response.data["detail"], "As credenciais de autenticação não foram fornecidas.")
        
    def test_listar_todos_fluxo_etapas(self):
        """Testa se a view retorna todos os FluxoEtapas cadastrados"""
        response = self.client.get(self.listar_fluxo_etapa_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)
        self.assertEqual(response.data[0]["id"], self.fluxo_etapa1.id)
        self.assertEqual(response.data[1]["id"], self.fluxo_etapa2.id)
        
    def test_listar_fluxo_etapas_sem_registros(self):
        """Testa a view quando não há FluxoEtapas cadastrados"""
        FluxoEtapa.objects.all().delete()
        response = self.client.get(self.listar_fluxo_etapa_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_listar_fluxo_etapas_usuario_nao_autenticado(self):
        """Testa o acesso sem autenticação"""
        self.client.force_authenticate(user=None)
        response = self.client.get(self.listar_fluxo_etapa_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)
        self.assertIn(response.data["detail"], "As credenciais de autenticação não foram fornecidas.")
        
    def test_excluir_fluxo_etapas_sucesso(self):
        """Testa a exclusão bem-sucedida de etapas do fluxo"""
        payload = {'ids_fluxo_etapas': [self.fluxo_etapa1.id, self.fluxo_etapa2.id]}
        response = self.client.delete(self.excluir_fluxo_etapa_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FluxoEtapa.objects.count(), 2)
        
    def test_excluir_fluxo_etapas_sem_ids(self):
        """Testa a tentativa de exclusão sem fornecer IDs"""
        payload = {}
        response = self.client.delete(self.excluir_fluxo_etapa_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O IDs dos objetos não foram fornecidos.')
        
    def test_excluir_fluxo_etapas_ids_nao_encontrados(self):
        """Testa a exclusão com IDs que não existem"""
        payload = {'ids_fluxo_etapas': [999, 1000]}
        response = self.client.delete(self.excluir_fluxo_etapa_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Uma ou mais objetos não foram encontrados.')
        
    def test_excluir_fluxo_etapas_usuario_nao_autenticado(self):
        """Testa a exclusão sem autenticação"""
        self.client.force_authenticate(user=None)
        payload = {'ids_fluxo_etapas': [self.fluxo_etapa1.id]}
        response = self.client.delete(self.excluir_fluxo_etapa_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
        self.assertIn(response.data["detail"], "As credenciais de autenticação não foram fornecidas.")
        
        
        
        
        
        