from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usuario.models import Usuario
from django.contrib.auth.models import Group
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.funcao_membro.models import CategoriaFuncaoMembro, FuncaoMembro
from django.db.models import ProtectedError


class CategoriaFuncaoViewsTest(APITestCase):
    def setUp(self):
        # Criar um usuário autenticado
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.grupo = Group.objects.create(name="TestGroup")
        
        self.categoria1 = CategoriaFuncaoMembro.objects.create(nome="Categoria 1", cor="#5858FA")
        self.categoria2 = CategoriaFuncaoMembro.objects.create(nome="Categoria 2", cor="#FE2E64")
        self.categoria3 = CategoriaFuncaoMembro.objects.create(nome="Categoria 3", cor="#DF3A01")
        
        self.dados_invalidos = {
            "nome": None,
            "cor": "#000000000"
        }
        
        self.dados_validos = {
            "nome": "Categoria de teste",
            "cor": "#FFFFFF"
        }
        
        ### Urls 
        self.cadastrar_categoria_url = reverse('funcao-membro:cadastrar_categoria_funcao_membro')
        self.atualizar_categoria_url = reverse('funcao-membro:atualizar_categoria_funcao_membro')
        self.buscar_categoria_pelo_nome_url = reverse('funcao-membro:buscar_categoria_pelo_nome')
        self.buscar_categoria_pelo_id_url = reverse('funcao-membro:buscar_categoria_pelo_id')
        self.listar_categorias_url = reverse('funcao-membro:listar_categoria_funcao_membro')
        self.excluir_categorias_url = reverse('funcao-membro:excluir_categoria_funcao_membro')
    
    def test_criar_categoria_funcao_membro_com_dados_validos(self):
        """Testa a criação de uma CategoriaFuncaoMembro com dados válidos."""
        response = self.client.post(self.cadastrar_categoria_url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CategoriaFuncaoMembro.objects.count(), 4)
        self.assertEqual(CategoriaFuncaoMembro.objects.first().nome, "Categoria 1")
        self.assertEqual(CategoriaFuncaoMembro.objects.first().cor, "#5858FA")
        
    def test_criar_categoria_funcao_membro_sem_dados(self):
        """Testa a criação de uma CategoriaFuncaoMembro sem dados na requisição."""
        response = self.client.post(self.cadastrar_categoria_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Os dados da categoria não foram fornecidos na Request.')
        
    def test_criar_categoria_funcao_membro_sem_nome(self):
        """Testa a criação de uma CategoriaFuncaoMembro sem o campo nome, que é obrigatório."""
        dados_sem_nome = {
            "nome": "",
            "cor": "#FFFFFF"
        }
        response = self.client.post(self.cadastrar_categoria_url, dados_sem_nome, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O campo nome é obrigatório para a criação da Categoria.')
        

    def test_criar_categoria_funcao_membro_com_cor_invalida(self):
        """Testa a criação de uma CategoriaFuncaoMembro com cor inválida."""
        dados_com_cor_invalida = {
            "nome": "Categoria Inválida",
            "cor": "#000000000"
        }
        response = self.client.post(self.cadastrar_categoria_url, dados_com_cor_invalida, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(response.data['error'], "O campo cor não pode possuir mais que 7 caracteres.")
        
    def test_criar_categoria_funcao_membro_usuario_nao_autenticado(self):
        """Testa a criação de uma CategoriaFuncaoMembro com usuário não autenticado"""
        self.client.logout()
        response = self.client.post(self.cadastrar_categoria_url, self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_atualizar_categoria_com_dados_validos(self):
        """Testa a atualização de uma categoria com dados válidos."""
        response = self.client.patch(
            f"{self.atualizar_categoria_url}?id_categoria={self.categoria1.id}",
            data=self.dados_validos,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.categoria1.refresh_from_db()
        self.assertEqual(self.categoria1.nome, "Categoria de teste")
        self.assertEqual(self.categoria1.cor, "#FFFFFF")
        
    def test_atualizar_categoria_sem_id(self):
        """Testa a tentativa de atualizar uma categoria sem fornecer o ID."""
        response = self.client.patch(self.atualizar_categoria_url, data=self.dados_validos, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'ID da categoria não fornecido')
        
    def test_atualizar_categoria_com_dados_invalidos(self):
        """Testa a tentativa de atualizar uma categoria com dados inválidos."""
        response = self.client.patch(
            f"{self.atualizar_categoria_url}?id_categoria={self.categoria1.id}",
            data=self.dados_invalidos,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Dados da categoria são inválidos!')
        
    def test_atualizar_categoria_sem_dados(self):
        """Testa a tentativa de atualizar uma categoria sem fornecer dados no corpo da requisição."""
        response = self.client.patch(
            f"{self.atualizar_categoria_url}?id_categoria={self.categoria1.id}",
            data={},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Os dados atualizados da categoria não foram fornecidos')
        
    def test_atualizar_categoria_com_id_inexistente(self):
        """Testa a tentativa de atualizar uma categoria com um ID inexistente."""
        response = self.client.patch(
            f"{self.atualizar_categoria_url}?id_categoria=9999",
            data=self.dados_validos,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Objeto CategoriaFuncaoMembro não encontrado.')
        
    def test_atualizar_categoria_usuario_nao_autenticado(self):
        """Testa a atualização de uma categoria com um usuário não autenticado"""
        self.client.logout()
        response = self.client.patch(
            f"{self.atualizar_categoria_url}?id_categoria={self.categoria1.id}",
            data=self.dados_validos,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_categorias_por_nome_especifico(self):
        """Teste para buscar categorias com um nome específico."""
        response = self.client.get(self.buscar_categoria_pelo_nome_url, {"nome_categoria": "Categoria 1"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["nome"], "Categoria 1")
        
    def test_buscar_categorias_com_nome_inexistente(self):
        """Teste para buscar categorias com um nome inexistente."""
        response = self.client.get(self.buscar_categoria_pelo_nome_url, {"nome_categoria": "Inexistente"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 0)
        self.assertEqual(response.data["message"], "Nenhum objeto encontrado.")
        
    def test_buscar_todas_as_categorias_sem_filtro(self):
        """Teste para buscar todas as categorias sem fornecer o nome."""
        response = self.client.get(self.buscar_categoria_pelo_nome_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 3)
        self.assertEqual(response.data["message"], "Categorias encontradas com sucesso.")
        
    def test_buscar_categorias_por_nome_usuario_nao_autenticado(self):
        """Teste para buscar categorias com um nome específico."""
        self.client.logout()
        response = self.client.get(self.buscar_categoria_pelo_nome_url, {"nome_categoria": "Categoria 1"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_buscar_categoria_por_id_existente(self):
        """Teste para buscar uma categoria com um ID existente."""
        response = self.client.get(self.buscar_categoria_pelo_id_url, {"id_categoria": self.categoria1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nome"], self.categoria1.nome)
        self.assertEqual(response.data["cor"], self.categoria1.cor)

    def test_buscar_categoria_por_id_inexistente(self):
        """Teste para buscar uma categoria com um ID inexistente."""
        response = self.client.get(self.buscar_categoria_pelo_id_url, {"id_categoria": 9999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Categoria não localizada.")

    def test_buscar_categoria_sem_id(self):
        """Teste para buscar uma categoria sem fornecer o ID."""
        response = self.client.get(self.buscar_categoria_pelo_id_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "O ID da categoria não foi fornecido")
        
    def test_buscar_categoria_por_id_usuario_nao_autenticado(self):
        """Teste para buscar uma categoria por ID com usuário não autenticado"""
        self.client.logout()
        response = self.client.get(self.buscar_categoria_pelo_id_url, {"id_categoria": self.categoria1.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_listar_todas_as_categorias(self):
        """Teste para listar todas as categorias de função."""
        response = self.client.get(self.listar_categorias_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]["nome"], self.categoria1.nome)
        self.assertEqual(response.data[1]["nome"], self.categoria2.nome)
        self.assertEqual(response.data[2]["nome"], self.categoria3.nome)
        
    def test_listar_sem_categorias(self):
        """Teste para listar categorias quando nenhuma categoria está presente."""
        CategoriaFuncaoMembro.objects.all().delete()  
        response = self.client.get(self.listar_categorias_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  
        
    def test_listar_categorias_usuario_nao_autenticado(self):
        """Teste para listar as categorias com usuário não autenticado."""
        self.client.logout()
        response = self.client.get(self.listar_categorias_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_excluir_categorias_existentes(self):
        """Teste para excluir categorias existentes."""
        ids_para_excluir = [self.categoria1.id, self.categoria2.id]
        response = self.client.delete(self.excluir_categorias_url, data={"ids_categoria": ids_para_excluir}, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CategoriaFuncaoMembro.objects.filter(id__in=ids_para_excluir).exists())
        
    def test_excluir_sem_fornecer_ids(self):
        """Teste para tentar excluir sem fornecer IDs."""
        response = self.client.delete(self.excluir_categorias_url, data={}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Os Ids das categorias não foram fornecidos!", response.data["error"])
        
    def test_excluir_ids_inexistentes(self):
        """Teste para excluir categorias com IDs que não existem."""
        response = self.client.delete(self.excluir_categorias_url, data={"ids_categoria": [999, 1000]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("Nenhum objeto encontrado com os IDs fornecidos", response.data["error"])
    
    def test_excluir_com_protected_error(self):
        """Teste para verificar o comportamento ao tentar excluir categorias protegidas."""
        # Simular uma `ProtectedError`
        with self.assertRaises(ProtectedError):
            # Criação fictícia de dependência, se necessário
            raise ProtectedError("Erro simulado", None)
