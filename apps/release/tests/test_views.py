from rest_framework import status
from rest_framework.test import APITestCase
from apps.release.models import Release
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from django.urls import reverse
from rest_framework.test import APIClient
from apps.usuario.models import Usuario
from django.contrib.auth.models import Group

class ReleaseViewsTests(APITestCase):

    def setUp(self):
        # Cria um usuário para autenticação
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.projeto = Projeto.objects.create(
            nome="Projeto Teste", data_inicio="2025-01-02", data_termino="2025-01-30")
        
        self.grupo = Group.objects.create(name='TestGroup')

        self.usuario = Usuario.objects.create(
            username="membro.teste@email.com",
            password="senha",
        )
        
        self.usuario1 = Usuario.objects.create(
            username="membro.01@email.com",
            password="senha",
        )
        
        self.membro = Membro.objects.create(
            nome='Membro de teste', 
            email="membro.teste@email.com", 
            usuario=self.usuario,
            grupo=self.grupo
        )
        
        self.membro1 = Membro.objects.create(
            nome="Membro 01",
            email="membro.01@email.com",
            usuario=self.usuario1,
            grupo=self.grupo
        )
        
        self.responsavel = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        
        self.release = {
            "nome": "Release de Teste",
            "descricao": "Descrição da release de testes",
            "status": "andamento",
            "data_lancamento": "2025-01-15",
            "projeto": self.projeto.id,
            "responsavel": self.responsavel.id
        }
        
        self.release_teste = Release.objects.create(
            nome="Release para teste",
            descricao="Descriação da release",
            status="pendente",
            data_lancamento="2025-02-01",
            projeto=self.projeto,
            responsavel=self.responsavel
        )
        
        self.projeto1 = Projeto.objects.create(
            nome="Projeto Teste 1", data_inicio="2025-01-02", data_termino="2025-01-30"
        )
        self.projeto2 = Projeto.objects.create(
            nome="Projeto Teste 2", data_inicio="2025-02-01", data_termino="2025-02-28"
        )
        
        self.release1 = Release.objects.create(
            nome="Release Alpha", descricao="Descrição Alpha", status="andamento",
            data_lancamento="2025-01-15", projeto=self.projeto1, responsavel=self.responsavel
        )
        self.release2 = Release.objects.create(
            nome="Release Beta", descricao="Descrição Beta", status="finalizado",
            data_lancamento="2025-02-15", projeto=self.projeto1, responsavel=self.responsavel
        )
        self.release3 = Release.objects.create(
            nome="Release Gamma", descricao="Descrição Gamma", status="pendente",
            data_lancamento="2025-03-01", projeto=self.projeto2, responsavel=self.responsavel
        )
        
        ### Urls 
        self.cadastrar_release_url = reverse('release:cadastrar_release')
        self.atualizar_release_url = reverse('release:atualizar_release')
        self.buscar_release_pelo_id = reverse('release:buscar_release_pelo_id')
        self.filtrar_releases_pelo_nome_e_pelo_projeto = reverse('release:filtrar_releases_pelo_nome_e_pelo_projeto')
        self.listar_releases_url = reverse('release:listar_releases')
        self.listar_releases_por_projeto_url = reverse('release:listar_releases_por_projeto')
        self.buscar_releases_dos_projetos_do_membro_url = reverse('release:buscar_releases_dos_projetos_do_membro')
        self.excluir_releases_url = reverse('release:excluir_releases')
        self.buscar_ultima_release_do_projeto_url = reverse('release:buscar_ultima_release_do_projeto')
        self.buscar_releases_adjacentes_url = reverse('release:buscar_releases_adjacentes')
        
    def test_cadastrar_release_com_sucesso(self):
        # Testa a criação bem-sucedida de uma release
        response = self.client.post(self.cadastrar_release_url, self.release, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nome'], self.release['nome'])
        self.assertEqual(response.data['descricao'], self.release['descricao'])
        self.assertEqual(response.data['status'], self.release['status'])
        self.assertEqual(response.data['data_lancamento'], self.release['data_lancamento'])
        self.assertEqual(response.data['projeto'], self.release['projeto'])
        self.assertEqual(response.data['responsavel'], self.release['responsavel'])
        
    def test_cadastrar_release_dados_invalidos(self):
        # Testa a criação de uma release com dados inválidos
        dados_invalidos = {
            "nome": None,
            "data_lancamento": "2025-01-03"
        }
        
        response = self.client.post(self.cadastrar_release_url, dados_invalidos, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(
            response.data["error"],
            "{'nome': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}"
        )

    def test_cadastrar_release_usuario_nao_autenticado(self):
        # Testa a tentativa de criar uma release sem autenticação
        self.client.logout()
        
        response = self.client.post(self.cadastrar_release_url, self.release, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_atualizar_release_com_sucesso(self):
        # Dados atualizados para a release
        release1 = Release.objects.create(
            nome="Release 01",
            data_lancamento="2025-01-10"
        )
        
        novos_dados = {
            "nome": "Release Atualizada",
            "descricao": "Descrição atualizada",
            "status": "concluida",
            "data_lancamento": "2025-01-20"
        }       
        
        response = self.client.patch(
            f'{self.atualizar_release_url}?id_release={release1.id}', novos_dados, format='json')
                
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], novos_dados['nome'])
        self.assertEqual(response.data['descricao'], novos_dados['descricao'])
        self.assertEqual(response.data['status'], novos_dados['status'])
        self.assertEqual(response.data['data_lancamento'], novos_dados['data_lancamento'])
        
    def test_atualizar_release_id_invalido(self):
        # Tentativa de atualização com ID inválido
        id_invalido = 9999
        novos_dados = {
            "nome": "Release Atualizada",
            "descricao": "Descrição atualizada",
            "status": "concluida",
            "data_lancamento": "2025-01-20"
        }  
        response = self.client.patch(
            f'{self.atualizar_release_url}?id_release={id_invalido}', novos_dados, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Release matching query does not exist.')
        
    def test_atualizar_release_id_nao_fornecido(self):
        # Tentativa de atualização sem fornecer o ID
        novos_dados = {
            "nome": "Release Atualizada",
            "descricao": "Descrição atualizada",
            "status": "concluida",
            "data_lancamento": "2025-01-20"
        }
        response = self.client.patch(self.atualizar_release_url, novos_dados, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O ID da release não foi fornecido!')
        
    def test_atualizar_release_dados_invalidos(self):
        # Tentativa de atualização com dados inválidos
        release1 = Release.objects.create(
            nome="Release 01",
            data_lancamento="2025-01-10"
        )
        
        dados_invalidos = {
            "nome": None,
            "data_lancamento": "2025-01-20"
        }
        response = self.client.patch(
            f'{self.atualizar_release_url}?id_release={release1.id}', dados_invalidos, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(
            response.data["error"],
            "{'nome': [ErrorDetail(string='Este campo não pode ser nulo.', code='null')]}"
        )
    
    def test_buscar_release_pelo_id_com_sucesso(self):
        # Testa a busca bem-sucedida de uma release pelo ID
        response = self.client.get(f'{self.buscar_release_pelo_id}?id_release={self.release_teste.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.release_teste.nome)
        self.assertEqual(response.data['descricao'], self.release_teste.descricao)
        self.assertEqual(response.data['status'], self.release_teste.status)
        self.assertEqual(response.data['data_lancamento'], self.release_teste.data_lancamento)

    def test_buscar_release_pelo_id_id_invalido(self):
        # Testa a busca com um ID inexistente
        response = self.client.get(f'{self.buscar_release_pelo_id}?id_release={9999}')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Release matching query does not exist.')
        
    def test_buscar_pelo_id_id_nao_fornecido(self):
        # Testa a busca sem fornecer o ID na URL
        response = self.client.get(self.buscar_release_pelo_id)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O ID da release não foi fornecido!')
        
    def test_filtrar_releases_por_nome_e_projeto(self):
        # Filtra por nome e ID do projeto
        response = self.client.get(
            f"{self.filtrar_releases_pelo_nome_e_pelo_projeto}?nome_release=Alpha&id_projeto={self.projeto1.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Release Alpha')
        
    def test_filtrar_releases_apenas_por_nome(self):
        # Filtra apenas pelo nome
        response = self.client.get(f"{self.filtrar_releases_pelo_nome_e_pelo_projeto}?nome_release=Beta")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Release Beta')

    def test_filtrar_releases_apenas_por_projeto(self):
        # Filtra apenas pelo ID do projeto
        response = self.client.get(f"{self.filtrar_releases_pelo_nome_e_pelo_projeto}?id_projeto={self.projeto2.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Release Gamma')
    
    def test_filtrar_releases_sem_parametros(self):
        # Testa a ausência de parâmetros
        response = self.client.get(self.filtrar_releases_pelo_nome_e_pelo_projeto)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(
            response.data['error'],
            'Os parâmetros nome da release e ID do projeto não foram fornecidos, é necessário pelo menos um parâmetro'
        )
        
    def test_listar_releases_com_dados(self):
        # Testa a listagem de releases com dados
        response = self.client.get(self.listar_releases_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)
        self.assertEqual(response.data[1]['nome'], 'Release Alpha')
        self.assertEqual(response.data[2]['nome'], 'Release Beta')
        
    def test_listar_releases_sem_dados(self):
        # Remove todas as releases e testa a listagem sem dados
        Release.objects.all().delete()
        response = self.client.get(self.listar_releases_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(response.data), 0)

    def test_listar_releases_por_projeto_com_dados(self):
        # Testa a listagem de releases de um projeto específico com dados
        response = self.client.get(f'{self.listar_releases_por_projeto_url}?id_projeto={self.projeto.id}')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Release para teste')

    def test_listar_releases_por_projeto_sem_dados(self):
        # Testa a listagem de releases de um projeto sem releases associadas
        Release.objects.all().delete()
        response = self.client.get(f'{self.listar_releases_por_projeto_url}?id_projeto={self.projeto.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_listar_releases_por_projeto_sem_id_projeto(self):
        # Testa a listagem de releases sem fornecer o ID do projeto
        response = self.client.get(self.listar_releases_por_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O ID do projeto não foi fornecido.')
        
    def test_buscar_releases_por_membro_com_projetos(self):
        # Testa a busca de releases associadas a um membro que participa de projetos
        response = self.client.get(f'{self.buscar_releases_dos_projetos_do_membro_url}?id_membro={self.membro.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Release para teste')
    
    def test_buscar_releases_por_membro_sem_projetos(self):
        # Testa a busca de releases para um membro que não participa de nenhum projeto
        response = self.client.get(f'{self.buscar_releases_dos_projetos_do_membro_url}?id_membro={self.membro1.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'O membro não está vinculado a nenhum projeto')
        self.assertEqual(response.data['code'], 'MEMBRO_SEM_PROJETO')        
    
    def test_buscar_releases_dos_projetos_do_membro_sem_id_membro(self):
        # Testa a tentativa de buscar releases sem fornecer o ID do membro
        response = self.client.get(self.buscar_releases_dos_projetos_do_membro_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O ID do membro não foi fornecido !')
        
    def test_excluir_releases_com_sucesso(self):
        # Testa a exclusão de releases existentes
        response = self.client.delete(self.excluir_releases_url, data={'ids_releases': [self.release1.id, self.release2.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Release.objects.count(), 2)
        
    def test_excluir_releases_parcialmente_encontradas(self):
        # Testa a exclusão com IDs mistos (alguns existentes e outros inexistentes)
        response = self.client.delete(
            self.excluir_releases_url, data={'ids_releases': [self.release1.id, 999]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Release.objects.count(), 3)
        
    def test_excluir_releases_sem_ids_fornecidos(self):
        # Testa a tentativa de exclusão sem fornecer IDs
        response = self.client.delete(self.excluir_releases_url, data={}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O IDs das releases não foram fornecidos')
        
    def test_excluir_releases_ids_inexistentes(self):
        # Testa a exclusão de releases com IDs que não existem
        response = self.client.delete(self.excluir_releases_url, data={'ids_releases': [999, 1000]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Uma ou mais releases não foram encontradas')

    def test_buscar_ultima_release_com_sucesso(self):
        # Testa a obtenção da última release com sucesso
        response = self.client.get(f'{self.buscar_ultima_release_do_projeto_url}?id_projeto={self.projeto.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('nome', response.data)
        self.assertEqual(response.data['nome'], self.release_teste.nome)
        
    def test_buscar_ultima_release_sem_releases(self):
        # Remove as releases e testa o caso de projeto sem releases
        Release.objects.all().delete()
        response = self.client.get(f'{self.buscar_ultima_release_do_projeto_url}?id_projeto={self.projeto.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Este projeto ainda não possui releases.')
        self.assertEqual(response.data['code'], 'PROJETO_SEM_RELEASES')
        
    def test_buscar_ultima_release_sem_id_projeto(self):
        # Testa o caso em que o ID do projeto não é fornecido
        response = self.client.get(self.buscar_ultima_release_do_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'O ID do projeto não foi fornecido!')
        
    def test_buscar_ultima_release_id_projeto_inexistente(self):
        # Testa o caso em que o ID do projeto não existe
        response = self.client.get(f'{self.buscar_ultima_release_do_projeto_url}?id_projeto={9999}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Este projeto ainda não possui releases.')
        self.assertEqual(response.data['code'], 'PROJETO_SEM_RELEASES')
        
    def test_buscar_releases_adjacentes_com_sucesso(self):
        # Testa a obtenção da release anterior e posterior
        response = self.client.get(
            f'{self.buscar_releases_adjacentes_url}?id_projeto={self.projeto2.id}&id_release={self.release2.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verifica se a resposta contém as releases anterior e posterior
        self.assertIn('release_anterior', response.data)
        self.assertIn('release_posterior', response.data)
    
    def test_buscar_releases_adjacentes_sem_id_projeto_ou_release(self):
        # Testa a falta de parâmetros id_projeto ou id_release
        response = self.client.get(self.buscar_releases_adjacentes_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'ID do projeto e da release atual são necessários!')
        
    def test_buscar_releases_adjacentes_com_id_projeto_inexistente(self):
        # Testa o caso de um id_projeto inexistente
        response = self.client.get(
            self.buscar_releases_adjacentes_url, {'id_projeto': 999, 'id_release': self.release2.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('release_anterior', response.data)
        self.assertIn('release_posterior', response.data)
        self.assertIsNone(response.data['release_anterior'])
        self.assertIsNone(response.data['release_posterior'])
        
    def test_buscar_releases_adjacentes_com_id_release_inexistente(self):
        # Testa o caso de um id_release inexistente
        response = self.client.get(
            self.buscar_releases_adjacentes_url, {'id_projeto': self.projeto.id, 'id_release': 999})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('release_anterior', response.data)
        self.assertIn('release_posterior', response.data)
        self.assertIsNone(response.data['release_posterior'])