from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usuario.models import Usuario
from django.contrib.auth.models import Group
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.funcao_membro.models import CategoriaFuncaoMembro, FuncaoMembro
from apps.funcao_membro.serializers import FuncaoMembroSerializer
from django.db.models import ProtectedError

class FuncaoMembroViewsTest(APITestCase):
    def setUp(self):
        # Criar um usuário autenticado
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.categoria1 = CategoriaFuncaoMembro.objects.create(nome="Categoria 1", cor="#5858FA")
        self.categoria2 = CategoriaFuncaoMembro.objects.create(nome="Categoria 2", cor="#FE2E64")
        self.categoria3 = CategoriaFuncaoMembro.objects.create(nome="Categoria 3", cor="#DF3A01")
        
        self.projeto = Projeto.objects.create(nome="Projeto 01", data_inicio="2025-01-01", data_termino="2025-01-30")
        self.outro_projeto = Projeto.objects.create(nome="Outro projeto", data_inicio="2025-01-01", data_termino="2025-01-30")
        
        self.usuario1 = Usuario.objects.create(username="membro.01@email.com", password="senha")
        self.usuario2 = Usuario.objects.create(username="membro.02@email.com", password="senha")
        
        self.membro1 = Membro.objects.create(
            nome="Membro 01", email='membro.01@email.com', grupo=self.grupo, usuario=self.usuario1)
        
        self.membro2 = Membro.objects.create(
            nome="Membro 02", email="membro.02@email.com", grupo=self.grupo, usuario=self.usuario2)
        
        self.membro_projeto1 = MembroProjeto.objects.create(membro=self.membro1, projeto=self.projeto)
        self.membro_projeto2 = MembroProjeto.objects.create(membro=self.membro2, projeto=self.projeto)
        self.membro_projeto3 = MembroProjeto.objects.create(membro=self.membro2, projeto=self.outro_projeto)
        
        self.iteracao = Iteracao.objects.create(
            nome="Iteração 1", data_inicio="2025-01-06", data_termino="2025-01-30", projeto=self.projeto)
        
        self.outra_iteracao = Iteracao.objects.create(
            nome="Outra iteracao", data_inicio="2025-01-06", data_termino="2025-01-30", projeto=self.outro_projeto)
        
        self.funcao1 = FuncaoMembro.objects.create(
            categoria_funcao=self.categoria1,
            membro_projeto=self.membro_projeto1,
            status=True,
            iteracao=self.iteracao
        )
        self.funcao2 = FuncaoMembro.objects.create(
            categoria_funcao=self.categoria2,
            membro_projeto=self.membro_projeto2,
            status=True,
            iteracao=self.iteracao
        )
    
        ### Urls 
        
        self.cadastrar_funcao_membro_url = reverse('funcao-membro:cadastrar_funcao_membro')
        self.atualizar_funcao_membro_url = reverse('funcao-membro:atualizar_funcao_membro')
        self.listar_funcao_membro_url = reverse('funcao-membro:listar_funcao_membro')
        self.listar_funcoes_do_membro_pelo_id_membro_url = reverse('funcao-membro:listar_funcoes_do_membro_pelo_id_membro')
        self.listar_funcoes_dos_membros_pelo_id_projeto_url = reverse('funcao-membro:listar_funcoes_dos_membros_pelo_id_projeto')
        self.filtrar_funcoes_membro_url = reverse('funcao-membro:filtrar_funcoes_membro')
        self.excluir_funcao_membro_url = reverse('funcao-membro:excluir_funcao_membro')
        self.buscar_funcao_atual_do_membro_url = reverse('funcao-membro:buscar_funcao_atual_do_membro')
        
    def test_cadastrar_funcao_membro_com_dados_validos(self):
        """Testa o cadastro de uma função de membro com dados válidos."""
        data = [
            {
                "categoria_funcao": self.categoria1.id,
                "membro_projeto": self.membro_projeto2.id,
                "status": True,
                "iteracao": self.iteracao.id
            }
        ]

        response = self.client.post(self.cadastrar_funcao_membro_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(FuncaoMembro.objects.count(), 3)
        self.assertEqual(FuncaoMembro.objects.first().categoria_funcao.nome, "Categoria 1")
        
    def test_cadastrar_funcao_membro_usuario_nao_autenticado(self):
        """Testa o cadastro de uma função de membro com dados válidos."""
        data = [
            {
                "categoria": self.categoria1.id,
                "membro_projeto": self.membro_projeto1.id,
                "status": True,
                "iteracao": self.iteracao.id
            },
            {
                "categoria": self.categoria2.id,
                "membro_projeto": self.membro_projeto2.id,
                "status": True,
                "iteracao": self.iteracao.id
            }
        ]
        self.client.logout()
        response = self.client.post(self.cadastrar_funcao_membro_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_cadastrar_funcao_membro_sem_dados(self):
        """Testa o comportamento da view ao enviar uma requisição sem dados."""
        response = self.client.post(self.cadastrar_funcao_membro_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Os dados não foram fornecidos na Request.', response.data['error'])
        
    def test_cadastrar_funcao_membro_dados_invalidos(self):
        """Testa o comportamento da view ao enviar dados inválidos."""
        data = [{
            "categoria_funcao": None,
            "membro_projeto": self.membro_projeto1.id
        }]

        response = self.client.post(self.cadastrar_funcao_membro_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("[{'categoria_funcao': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}]", response.data['error'])

    def test_cadastrar_funcao_membro_funcao_duplicada(self):
        """Testa o comportamento da view ao tentar cadastrar uma função duplicada para o mesmo membro."""
        FuncaoMembro.objects.create(
            categoria_funcao=self.categoria2,
            membro_projeto=self.membro_projeto1,
            status=True,
            iteracao=self.iteracao
        )
        data = [{
            "categoria_funcao": self.categoria2.id,
            "membro_projeto": self.membro_projeto1.id,
            "status": True,
            "iteracao": self.iteracao.id
        }]
        response = self.client.post(self.cadastrar_funcao_membro_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Este membro já possui essa função atribuída.', response.data['error'])
        
    def test_atualizar_funcao_membro_com_dados_validos(self):
        """Testa a atualização de uma função de membro com dados válidos."""
        funcao_membro = FuncaoMembro.objects.create(
            categoria_funcao=self.categoria2,
            membro_projeto=self.membro_projeto1,
            status=True,
            iteracao=self.iteracao
        )

        data = {
            "categoria_funcao":self.categoria2.id,
            "status": True,
        }

        response = self.client.patch(
            f"{self.atualizar_funcao_membro_url}?id_funcao_membro={funcao_membro.id}",
            data,
            format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        funcao_membro.refresh_from_db()
        self.assertEqual(funcao_membro.categoria_funcao.nome, "Categoria 2")
        self.assertTrue(funcao_membro.status)
        
    def test_atualizar_funcao_membro_com_id_invalido(self):
        """Testa a atualização de uma função de membro com um ID inválido."""
        data = {"status": True}
        response = self.client.patch(f"{self.atualizar_funcao_membro_url}?id_funcao_membro=999", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("O objeto FuncaoMembro não foi encontrado!", response.data['error'])
        
    def test_atualizar_funcao_membro_sem_id(self):
        """Testa a atualização de uma função de membro sem fornecer o ID."""
        data = { "status": True }
        response = self.client.patch(self.atualizar_funcao_membro_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("O ID da FuncaoMembro não foi fornecido!", response.data['error'])
        
    def test_atualizar_funcao_membro_desativando(self):
        """Testa a desativação de uma função de membro."""
        funcao_membro = FuncaoMembro.objects.create(
            categoria_funcao=self.categoria1,
            membro_projeto=self.membro_projeto2,
            status=True,
            iteracao=self.iteracao
        )
        data = { "status": False }
        response = self.client.patch(
            f"{self.atualizar_funcao_membro_url}?id_funcao_membro={funcao_membro.id}",
            data, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        funcao_membro.refresh_from_db()
        self.assertFalse(funcao_membro.status)
        
    def test_atualizar_funcao_membro_usuario_nao_autenticado(self):
        """Testa a atualização quando o usuário não está autenticado"""
        self.client.logout()
        funcao_membro = FuncaoMembro.objects.create(
            categoria_funcao=self.categoria2,
            membro_projeto=self.membro_projeto1,
            status=True,
            iteracao=self.iteracao
        )
        data = { "status": False }
        response = self.client.patch(
            f"{self.atualizar_funcao_membro_url}?id_funcao_membro={funcao_membro.id}",
            data, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_funcoes_do_membro_com_id_valido(self):
        """Testa a listagem de funções de um membro de projeto com ID válido."""
        response = self.client.get(
            f"{self.listar_funcoes_do_membro_pelo_id_membro_url}?id_membro_projeto={self.membro_projeto1.id}"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        expected_data = FuncaoMembroSerializer(
            [self.funcao1], many=True
        ).data
        self.assertEqual(response.data, expected_data)
        
    def test_listar_funcoes_do_membro_com_id_inexistente(self):
        """Testa a listagem de funções de um membro de projeto com um ID inexistente."""
        response = self.client.get(
            f"{self.listar_funcoes_do_membro_pelo_id_membro_url}?id_membro_projeto=999")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn(
            "Não existem funções vinculadas ao ID do MembroProjeto fornecido !",
            response.data["error"])
        
    def test_listar_funcoes_do_membro_sem_id(self):
        """Testa a listagem de funções de um membro de projeto sem fornecer o ID."""
        response = self.client.get(self.listar_funcoes_do_membro_pelo_id_membro_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("O ID do MembroProjeto não foi fornecido!", response.data["error"])
        
    def test_listar_funcoes_do_membro_usuario_nao_autenticado(self):
        """Testa a listagem de funções de um membro de projeto quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_funcoes_do_membro_pelo_id_membro_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_funcoes_com_id_projeto_valido(self):
        """Teste quando o ID do projeto é fornecido corretamente"""
        response = self.client.get(self.listar_funcoes_dos_membros_pelo_id_projeto_url, {'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2) 
        self.assertEqual(response.data[0]['id'], self.funcao1.id)
        self.assertEqual(response.data[1]['id'], self.funcao2.id)
        
    def test_listar_funcoes_sem_id_projeto(self):
        """Teste quando o ID do projeto não é fornecido"""
        response = self.client.get(self.listar_funcoes_dos_membros_pelo_id_projeto_url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do projeto não foi fornecido !')
        
    def test_listar_funcoes_com_id_projeto_invalido(self):
        """Teste quando o ID do projeto fornecido não existe"""
        response = self.client.get(self.listar_funcoes_dos_membros_pelo_id_projeto_url, {'id_projeto': 999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Nenhum dado foi encontrado !')
        
    def test_listar_funcoes_com_id_projeto_usuario_nao_autenticado(self):
        """Teste quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_funcoes_dos_membros_pelo_id_projeto_url, {'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_listar_funcoes_com_dados(self):
        """Teste quando há dados na tabela FuncaoMembro"""
        response = self.client.get(self.listar_funcao_membro_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  
        self.assertEqual(response.data[0]['categoria_funcao'], self.funcao1.categoria_funcao.id)
        self.assertEqual(response.data[1]['categoria_funcao'], self.funcao2.categoria_funcao.id)
        
    def test_listar_funcoes_sem_dados(self):
        """Teste quando não há dados na tabela FuncaoMembro"""
        FuncaoMembro.objects.all().delete()
        response = self.client.get(self.listar_funcao_membro_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_listar_funcoes_usuario_nao_autenticado(self):
        """Teste quando o usuário não está autenticado"""
        self.client.logout()
        response = self.client.get(self.listar_funcao_membro_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_filtrar_por_categoria_funcao(self):
        """Teste filtrando por categoria de função"""
        response = self.client.get(self.filtrar_funcoes_membro_url, {'categoria_funcao': self.categoria1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['categoria_funcao'], self.categoria1.id)
        
    def test_filtrar_por_membro_projeto(self):
        """Teste filtrando por membro do projeto"""
        response = self.client.get(self.filtrar_funcoes_membro_url, {'membro_projeto': self.membro_projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  
        
    def test_filtrar_por_membro_projeto_e_categoria_funcao(self):
        """Teste filtrando por membro do projeto e categoria de função"""
        response = self.client.get(
            self.filtrar_funcoes_membro_url, 
            {'membro_projeto': self.membro_projeto1.id, 'categoria_funcao': {self.categoria1.id}})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
        
    def test_filtrar_por_projeto(self):
        """Teste filtrando por projeto"""
        response = self.client.get(self.filtrar_funcoes_membro_url, {'projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2) 
        
    def test_filtrar_por_projeto_e_categoria_funcao(self):
        """Teste filtrando por projeto e categoria de função"""
        response = self.client.get(self.filtrar_funcoes_membro_url, {'projeto': self.projeto.id, 'categoria_funcao': self.categoria1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
        
    def test_filtrar_sem_filtro(self):
        """Teste sem nenhum filtro (deve retornar todas as funções)"""
        response = self.client.get(self.filtrar_funcoes_membro_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  
        
    def test_filtrar_com_filtro_invalido(self):
        """Teste com filtro inválido"""
        response = self.client.get(self.filtrar_funcoes_membro_url, {'projeto': 999})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
        
    def test_filtrar_com_usuario_nao_autenticado(self):
        """Teste com usuário não autenticado"""
        self.client.logout()
        response = self.client.get(self.filtrar_funcoes_membro_url, {'projeto': 999})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_funcao_membro_projeto_com_sucesso(self):
        """Teste de exclusão de uma função de membro de projeto existente"""
        response = self.client.delete(f'{self.excluir_funcao_membro_url}?id_funcao_membro_projeto={self.funcao1.id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, {"detail": "Objeto FuncaoMembro excluído com sucesso"})
        self.assertFalse(FuncaoMembro.objects.filter(id=self.funcao1.id).exists())  
        
    def test_excluir_funcao_membro_projeto_sem_id(self):
        """Teste sem fornecer o ID da função de membro do projeto"""
        response = self.client.delete(self.excluir_funcao_membro_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'O ID da FuncaoMembro não foi fornecido'})
        
    def test_excluir_funcao_membro_projeto_nao_encontrado(self):
        """Teste de exclusão com ID de função de membro de projeto inexistente"""
        response = self.client.delete(f'{self.excluir_funcao_membro_url}?id_funcao_membro_projeto={9999}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'error': 'O objeto FuncaoMembro não foi encontrado!'})

    def test_excluir_funcao_membro_projeto_usuario_nao_autenticado(self):
        """Teste de exclusão com ID de função de membro de projeto com usuário não autenticado"""
        self.client.logout()
        response = self.client.delete(f'{self.excluir_funcao_membro_url}?id_funcao_membro_projeto={9999}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_funcao_membro_projeto_atual_com_sucesso(self):
        """Teste para a situação em que há uma iteração em andamento e a função do membro existe"""
        response = self.client.get(self.buscar_funcao_atual_do_membro_url, {'id_projeto': self.projeto.id, 'id_membro_projeto': self.membro_projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
    def test_buscar_funcao_membro_projeto_atual_sem_funcao(self):
        """Teste quando a função para o membro no projeto não foi encontrada"""
        response = self.client.get(self.buscar_funcao_atual_do_membro_url, {'id_projeto': self.outro_projeto.id, 'id_membro_projeto': self.membro_projeto3.id})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['code'], 'MEMBRO_SEM_FUNCAO_ATUAL')
        
    def test_buscar_funcao_membro_projeto_atual_sem_iteracao_em_andamento(self):
        """Teste quando não há iteração em andamento no projeto"""
        iteracao = Iteracao.objects.get(id=self.outra_iteracao.id)
        iteracao.delete()
        response = self.client.get(self.buscar_funcao_atual_do_membro_url, {'id_projeto': self.outro_projeto.id, 'id_membro_projeto': self.membro_projeto3.id})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['code'], 'ITERACAO_NAO_ENCONTRADA')
        
    def test_buscar_funcao_membro_projeto_atual_sem_id_projeto(self):
        """Teste sem fornecer o ID do projeto"""
        response = self.client.get(self.buscar_funcao_atual_do_membro_url, {'id_membro_projeto': self.membro_projeto1.id})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do projeto não foi fornecido !')
        
    def test_buscar_funcao_membro_projeto_atual_sem_id_membro_projeto(self):
        """Teste sem fornecer o ID do membro do projeto"""
        response = self.client.get(self.buscar_funcao_atual_do_membro_url, {'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'O ID do membro do projeto não foi fornecido !')
        
    def test_buscar_funcao_membro_projeto_atual_usuario_nao_autenticado(self):
        """Teste com usuário não autenticado"""
        self.client.logout()
        response = self.client.get(self.buscar_funcao_atual_do_membro_url, {'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
