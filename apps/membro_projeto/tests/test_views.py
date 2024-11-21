from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto, FuncaoMembroProjeto, FuncaoMembroProjetoAtual

class MembroProjetoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.funcao = FuncaoMembroProjeto.objects.create(nome='Função Teste')

    def test_cadastrar_membro_projeto(self):
        """Testa a criação de uma instância de MembroProjeto"""
        url = reverse('membro_projeto:cadastrar_membro_projeto')
        data = {
            'membros': [
                {'projeto': self.projeto.id, 'membro': self.membro.id}
            ]
        }
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_buscar_membro_projeto_pelo_usuario_github(self):
    #     url = reverse('membro_projeto:buscar_membro_projeto_pelo_usuario_github')
    #     MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        
    #     response = self.client.get(url, {'usuario_github': 'user_github', 'id_projeto': self.projeto.id})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertIn('id_membro_projeto', response.json())

    def test_buscar_membro_projeto_pelo_id_membro(self):
        """Testa a busca de um MembroProjeto pelo id do membro"""
        url = reverse('membro_projeto:buscar_pelo_id_membro')
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        response = self.client.get(url, {'id_membro': self.membro.id, 'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('id', response.json())

    # def test_buscar_projetos_do_membro(self):
    #     url = reverse('membro_projeto:buscar_projetos_do_membro')
    #     MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
    #     response = self.client.get(f'/api/buscar_projetos_do_membro/{self.membro.id}/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertIn('id', response.json()[0])

    def test_buscar_membros_por_projeto(self):
        """Testa a busca dos membros pelo id do projeto"""
        url = reverse('membro_projeto:buscar_membro_projeto_pelo_id_projeto', args=[self.projeto.id])
        self.membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Converta a resposta para JSON
        response_data = response.json()
        
        # Verifique se o ID do membro_projeto está presente na resposta
        self.assertTrue(any(item['id'] == self.membro_projeto.id for item in response_data))

    def test_atualizar_membro_projeto(self):
        self.membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        url = reverse('membro_projeto:atualizar_membro_projeto', args=[self.membro_projeto.id])
        data = {'projeto': self.projeto.id, 'membro': self.membro.id}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_excluir_membro_projeto_one(self):
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        url = reverse('membro_projeto:excluir_membro_projeto_individual', args=[membro_projeto.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_excluir_membro_projeto_many(self):
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        url = reverse('membro_projeto:excluir_membro_projeto_coletivo', args=[self.projeto.id])
        response = self.client.delete(url, data={'ids_membros': [self.membro.id]})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_quantidade_membros_por_projeto(self):
        MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        url = reverse('membro_projeto:buscar_quantidade_membros_por_projeto', args=[self.projeto.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('quantidade_membros', response.json())

    # def test_listar_membros_por_projeto(self):
    #     membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
    #     FuncaoMembroProjetoAtual.objects.create(membro_projeto=membro_projeto, funcao_membro=self.funcao, ativo=True)
    #     url = reverse('membro_projeto:listar_membros_por_projeto', args=[self.projeto.id])
    #     response = self.client.get(url)
    #     print(response.data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertIn('id_membro_projeto', response.json()[0])

    def test_cadastrar_funcao_membro(self):
        data = {
            'funcoes': [
                {'nome': 'Função Teste', 'descricao': 'Descrição da função'}
            ]
        }
        url = reverse('membro_projeto:cadastrar_funcoes_membro_projeto')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cadastrar_funcao_atual(self):
        membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        url = reverse('membro_projeto:cadastrar_funcao_atual')
        data = {'membro_projeto': membro_projeto.id, 'funcao_membro': self.funcao.id, 'ativo': True}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_listar_funcoes_membro(self):
        url = reverse('membro_projeto:lista_funcoes')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('nome', response.json()[0])
