from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.membro_projeto.serializers import MembroProjetoSerializer
from django.contrib.auth.models import Group
from django.db import IntegrityError

class MembroProjetoViewsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Usuario.objects.create(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.grupo = Group.objects.create(name='TestGroup')
        
        self.projeto1 = Projeto.objects.create(
            nome="Projeto 01", data_inicio='2024-08-17', data_termino='2024-08-30')
        
        self.projeto2 = Projeto.objects.create(
            nome="Projeto 02", data_inicio='2024-08-17', data_termino='2024-08-30')
        
        self.projeto3 = Projeto.objects.create(
            nome="Projeto 03", data_inicio='2024-08-17', data_termino='2024-08-30')
        
        
        self.usuario1 = Usuario.objects.create(username="membro.01@email.com", password="senha")
        self.usuario2 = Usuario.objects.create(username="membro.02@email.com", password="senha")
        self.usuario3 = Usuario.objects.create(username="membro.03@email.com", password="senha")

        self.membro1 = Membro.objects.create(
            nome="Membro 01", email="membro.01@email.com", usuario=self.usuario1, grupo=self.grupo)
        
        self.membro2 = Membro.objects.create(
            nome="Membro 02", email="membro.02@email.com", usuario=self.usuario2, grupo=self.grupo)
        
        self.membro3 = Membro.objects.create(
            nome="Membro 03", email="membro.03@email.com", usuario=self.usuario3, grupo=self.grupo)
        
        self.membro_projeto = MembroProjeto.objects.create(
            projeto=self.projeto1,
            membro=self.membro1,
        )

        ### Urls
        
        self.cadastrar_membro_projeto_url = reverse('membro-projeto:cadastrar_membro_projeto')
        self.atualizar_membro_projeto_url = reverse('membro-projeto:atualizar_membro_projeto')
        self.buscar_pelo_id_membro_e_id_projeto_url = reverse('membro-projeto:buscar_pelo_id_membro_e_id_projeto')
        self.buscar_projetos_do_membro_url = reverse('membro-projeto:buscar_projetos_do_membro')
        self.buscar_membros_por_projeto_url = reverse('membro-projeto:buscar_membros_por_projeto')
        self.listar_membro_projeto_url = reverse('membro-projeto:listar_membro_projeto')
        self.listar_equipes_url = reverse('membro-projeto:listar_equipes')
        self.excluir_membro_projeto_url = reverse('membro-projeto:excluir_membro_projeto')
        
    def test_cadastrar_membros_com_sucesso(self):
        """Testa o cadastro de membros em um projeto com sucesso."""
        payload = {
            'projeto': self.projeto2.id,
            'membros': [self.membro2.id]
        }
        response = self.client.post(self.cadastrar_membro_projeto_url, data=payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['projeto'], self.projeto2.id)
        self.assertEqual(response.data[0]['membro'], self.membro2.id)
        
    def test_cadastrar_membros_usuario_nao_autenticado(self):
        """Testa o cadastro de membros em um projeto com sucesso."""
        self.client.logout()
        payload = {
            'projeto': self.projeto2.id,
            'membros': [self.membro2.id]
        }
        response = self.client.post(self.cadastrar_membro_projeto_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        
    def test_cadastrar_membros_ja_vinculados(self):
        """Testa o retorno ao tentar cadastrar membros já vinculados a um projeto."""
        MembroProjeto.objects.create(projeto=self.projeto2, membro=self.membro2)
        payload = {
            'projeto': self.projeto2.id,
            'membros': [self.membro2.id]
        }
        response = self.client.post(self.cadastrar_membro_projeto_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'Os membros selecionados já estão vinculados ao projeto.')
        
    def test_cadastrar_membros_com_dados_incompletos(self):
        """Testa o envio de dados incompletos."""
        payload = {'projeto': self.projeto1.id}  # Sem membros
        response = self.client.post(self.cadastrar_membro_projeto_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do projeto e os IDs dos membros são necessários.')

        payload = {'membros': [self.membro1.id]}  # Sem projeto
        response = self.client.post(self.cadastrar_membro_projeto_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do projeto e os IDs dos membros são necessários.')
        
    def test_atualizar_membro_projeto_sucesso(self):
        """Teste para atualizar com sucesso um membro do projeto."""
        payload = {
            "membro": self.membro1.id,
            "projeto": self.projeto2.id
        }
        response = self.client.patch(f"{self.atualizar_membro_projeto_url}?id_membro_projeto={self.membro_projeto.id}", payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifique se os dados foram atualizados corretamente
        self.membro_projeto.refresh_from_db()
        self.assertEqual(self.membro_projeto.projeto, self.projeto2)
    
    def test_atualizar_membro_projeto_dados_invalidos(self):
        """Teste para tentar atualizar membro com dados inválidos."""
        payload = {
            "membro": None,
            "projeto": None
        }
        response = self.client.patch(
            f"{self.atualizar_membro_projeto_url}?id_membro_projeto={self.membro_projeto.id}", payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], "{'projeto': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')], 'membro': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}")
        
    def test_atualizar_membro_projeto_inexistente(self):
        """Teste para tentar atualizar um membro de projeto inexistente."""
        payload = {
            "membro": self.membro1.id,
            "projeto": self.projeto2.id
        }
        response = self.client.patch(
            f"{self.atualizar_membro_projeto_url}?id_membro_projeto=9999", payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], "MembroProjeto matching query does not exist.")
        
    def test_atualizar_membro_projeto_sem_id(self):
        """Teste para tentar atualizar sem fornecer o ID do membro do projeto."""
        payload = {
            "membro": self.membro1.id,
            "projeto": self.projeto2.id
        }
        response = self.client.patch(self.atualizar_membro_projeto_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do membro-projeto é necessário.')
        
    def test_atualizar_membro_projeto_sem_autenticacao(self):
        """Teste para tentar atualizar sem autenticação"""
        self.client.logout()
        payload = {
            "membro": self.membro1.id,
            "projeto": self.projeto1.id
        }        
        
        response = self.client.patch(
            f'{self.atualizar_membro_projeto_url}?id={self.membro_projeto.id}', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_membro_projeto_com_sucesso(self):
        """Teste para buscar um membro de projeto com sucesso."""
        response = self.client.get(
            f"{self.buscar_pelo_id_membro_e_id_projeto_url}?id_membro={self.membro_projeto.membro_id}&id_projeto={self.membro_projeto.projeto_id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = MembroProjetoSerializer(instance=self.membro_projeto).data
        self.assertEqual(response.json(), expected_data)
        
    def test_buscar_membro_projeto_parametros_ausentes(self):
        """Teste para buscar sem fornecer os parâmetros obrigatórios."""
        response = self.client.get(self.buscar_pelo_id_membro_e_id_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertIn("parâmetros referentes ao id do membro e do projeto são obrigatórios", response.data["error"])
        
    def test_buscar_membro_projeto_nao_encontrado(self):
        """Teste para buscar um membro de projeto inexistente."""
        response = self.client.get(f"{self.buscar_pelo_id_membro_e_id_projeto_url}?id_membro=999&id_projeto=999")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Não foi possível localizar a relação membro-projeto.")

    def test_buscar_membro_projeto_usuario_nao_autenticado(self):
        """Teste para garantir que usuários não autenticados não podem acessar a view."""
        self.client.logout()
        response = self.client.get(f"{self.buscar_pelo_id_membro_e_id_projeto_url}?id_membro={self.membro_projeto.membro_id}&id_projeto={self.membro_projeto.projeto_id}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_projetos_do_membro_com_sucesso(self):
        """Teste para buscar projetos de um membro com sucesso."""
        
        MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto2)
        MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto3)
        
        response = self.client.get(f"{self.buscar_projetos_do_membro_url}?id_membro={self.membro1.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['nome_projeto'], "Projeto 01")
        
    def test_buscar_projetos_do_membro_sem_parametro_id_membro(self):
        """Teste para verificar falta do parâmetro id_membro."""
        response = self.client.get(self.buscar_projetos_do_membro_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'Parâmetro id_membro não fornecido!'})
        
    def test_buscar_projetos_do_membro_id_membro_invalido(self):
        """Teste para verificar a busca, fornecendo um id inválido"""
        response = self.client.get(f'{self.buscar_projetos_do_membro_url}?id_membro={9999}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
        
    def test_buscar_projetos_do_membro_usuario_nao_autenticado(self):
        """Teste para verificar quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(f'{self.buscar_projetos_do_membro_url}?id_membro={self.membro1.id}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_membros_por_projeto_com_sucesso(self):
        """Teste para buscar membros associados a um projeto com sucesso."""    
        MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto2)
        MembroProjeto.objects.create(membro=self.membro2, projeto=self.projeto2)
        response = self.client.get(f"{self.buscar_membros_por_projeto_url}?id_projeto={self.projeto2.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['nome_membro'], "Membro 01")
    
    def test_buscar_membros_sem_membros_associados(self):
        """Teste para buscar membros de um projeto sem membros associados."""
        response = self.client.get(f"{self.buscar_membros_por_projeto_url}?id_projeto={self.projeto2.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_buscar_membros_sem_id_projeto(self):
        """Teste para buscar membros sem fornecer o parâmetro id_projeto."""
        response = self.client.get(self.buscar_membros_por_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Parâmetro id_projeto não fornecido!')

    def test_buscar_membros_com_projeto_inexistente(self):
        """Teste para buscar membros de um projeto inexistente."""        
        response = self.client.get(f"{self.buscar_membros_por_projeto_url}?id_projeto=9999")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
       
    def test_buscar_membros_por_projeto_usuario_nao_autenticado(self):
        """Teste para verificar a busca quando o usuário não está autenticado"""
        self.client.logout()
        MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto2)
        MembroProjeto.objects.create(membro=self.membro2, projeto=self.projeto2)
        response = self.client.get(f"{self.buscar_membros_por_projeto_url}?id_projeto={self.projeto2.id}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_membros_projeto_com_sucesso(self):
        """Teste para listar todos os membros de projetos com sucesso."""
        response = self.client.get(self.listar_membro_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["nome_projeto"], "Projeto 01")    
        
    def test_listar_membros_sem_membros_associados(self):
        """Teste para listar membros de projetos quando não houver membros."""
        MembroProjeto.objects.all().delete()
        response = self.client.get(self.listar_membro_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)        
        self.assertEqual(response.data, [])
        
    def test_listar_equipes_com_sucesso(self):
        """Teste para listar os membros da equipe de um membro com sucesso."""
        MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto2)
        MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto3)
        response = self.client.get(f"{self.listar_equipes_url}?id_membro={self.membro1.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['nome'], 'Membro 01')
        
    def test_listar_equipes_membro_sem_projeto(self):
        """Teste para quando o membro não estiver vinculado a nenhum projeto."""
        response = self.client.get(f"{self.listar_equipes_url}?id_membro={self.membro2.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        expected_response = {
            'message': 'O membro não está vinculado a nenhum projeto',
            'code': 'MEMBRO_SEM_PROJETO'
        }
        
        self.assertEqual(response.data, expected_response)
        
    def test_listar_equipes_parametro_id_membro_nao_fornecido(self):
        """Teste para quando o parâmetro id_membro não for fornecido na requisição."""
        response = self.client.get(self.listar_equipes_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        expected_response = {'error': 'O ID do membro não foi fornecido!'}
        self.assertEqual(response.data['error'], 'O ID do membro não foi fornecido!')
        
    def test_listar_equipes_usuario_nao_autenticado(self):
        """Teste para quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(f"{self.listar_equipes_url}?id_membro={self.membro2.id}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_membro_projeto_com_sucesso(self):
        """Teste para excluir membros do projeto com sucesso."""
        membro_projeto_1 = MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto2)
        membro_projeto_2 = MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto3)
        
        ids_para_excluir = [membro_projeto_1.id, membro_projeto_2.id]
        
        response = self.client.delete(
            self.excluir_membro_projeto_url, data={'ids_membro_projeto': ids_para_excluir}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, {"detail": "Objetos Membro Projeto excluídos com sucesso."})
        self.assertFalse(MembroProjeto.objects.filter(id=membro_projeto_1.id).exists())
        self.assertFalse(MembroProjeto.objects.filter(id=membro_projeto_2.id).exists())
        
    def test_excluir_membro_projeto_ids_nao_fornecidos(self):
        """Teste para quando os IDs dos membros_projeto não são fornecidos."""
        
        response = self.client.delete(self.excluir_membro_projeto_url, data={}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Os IDs dos membros_projeto não foram fornecidos!')
        
    def test_excluir_membro_projeto_objetos_nao_encontrados_para_exclusao(self):
        """Teste para quando os objetos MembroProjeto não são encontrados."""
        
        ids_inexistentes = [999, 1000]
        response = self.client.delete(
            self.excluir_membro_projeto_url, data={'ids_membro_projeto': ids_inexistentes}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Um ou mais objetos não foram encontrados.')
        
        