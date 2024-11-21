from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from apps.tipo.models import Tipo
from apps.tarefa.models import Tarefa, IntervaloTempo

class TarefaViewsTestCase(TestCase):
    def setUp(self):
        # Cria um usuário para autenticação
        self.user = Usuario.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        
        # Cria um objeto de Iteracao para usar nos testes
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        #self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        #self.membroProjeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.iteracao = Iteracao.objects.create(nome="Iteração 1", numero=1, data_inicio='2024-08-17', data_termino='2024-08-30')
        self.tipo = Tipo.objects.create(nome='Tipo Teste', cor="#FFFFFF")
        # Cria um objeto de Tarefa para usar nos testes
        self.tarefa = Tarefa.objects.create(
            nome='Tarefa Teste',
            descricao='Descrição da tarefa',
            status='andamento',
            tipo=self.tipo,
            projeto=self.projeto,
            iteracao=self.iteracao
        )

        # URLs
        self.cadastrar_url = reverse('tarefa:cadastrar_tarefa')
        self.buscar_url = reverse('tarefa:buscar_tarefa_pelo_id', args=[self.tarefa.id])
        self.listar_por_projeto_url = reverse('tarefa:listar_tarefas_por_projeto', args=[self.projeto.id])
        self.atualizar_url = reverse('tarefa:atualizar_tarefa', args=[self.tarefa.id])
        self.excluir_url = reverse('tarefa:excluir_tarefa')
        self.concluir_url = reverse('tarefa:concluir_tarefa')
        self.reabrir_url = reverse('tarefa:reabrir_tarefa')
        self.listar_por_iteracao_url = reverse('tarefa:listar_tarefas_por_iteracao', args=[self.iteracao.id])
        self.listar_url = reverse('tarefa:listar_tarefas')
        self.filtrar_url = reverse('tarefa:filtrar_tarefas_pelo_nome_e_pelo_projeto')
        self.verificar_existencia_url = reverse('tarefa:verificar-existencia_issue')
        self.sicronizar_issues_url = reverse('tarefa:sicronizar_issues')
        self.cadastrar_label_url = reverse('tarefa:cadastrar_label')
        self.iniciar_contagem_tempo_url = reverse('tarefa:iniciar-contagem-tempo')
        self.parar_contagem_tempo_url = reverse('tarefa:parar-contagem-tempo')
        self.atualizar_iteracao_url = reverse('tarefa:atualizar_iteracao')

    def test_cadastrar_tarefa(self):
        data = {
            'nome': 'Nova Tarefa',
            'descricao': 'Descrição da nova tarefa',
            'status': 'andamento',
            'tipo': self.tipo.id,  
            'projeto': self.projeto.id,
            'iteracao': self.iteracao.id
        }
        response = self.client.post(self.cadastrar_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tarefa.objects.count(), 2)

    def test_buscar_tarefa_pelo_id(self):
        response = self.client.get(self.buscar_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertEqual(response_data['id'], self.tarefa.id)
        self.assertEqual(response_data['nome'], self.tarefa.nome)

    def test_listar_tarefas_por_projeto(self):
        response = self.client.get(self.listar_por_projeto_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertGreater(len(response_data), 0)

    def test_atualizar_tarefa(self):
        data = {
            'nome': 'Tarefa Atualizada'
        }
        response = self.client.patch(self.atualizar_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.tarefa.refresh_from_db()
        self.assertEqual(self.tarefa.nome, 'Tarefa Atualizada')

    def test_excluir_tarefa(self):
        # Prepare the URL with query parameters
        url_with_params = f"{self.excluir_url}?ids[]={self.tarefa.id}"
        
        # Perform the DELETE request
        response = self.client.delete(url_with_params)
        
        # Verify the response status code
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Verify that the Tarefa object was deleted
        self.assertEqual(Tarefa.objects.count(), 0)

    def test_concluir_tarefas(self):
        response = self.client.patch(self.concluir_url, {'ids': [self.tarefa.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.tarefa.refresh_from_db()
        self.assertTrue(self.tarefa.concluida)

    def test_reabrir_tarefas(self):
        self.tarefa.concluida = True
        self.tarefa.save()
        response = self.client.patch(self.reabrir_url, {'ids': [self.tarefa.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.tarefa.refresh_from_db()
        self.assertFalse(self.tarefa.concluida)

    def test_listar_tarefas_por_iteracao(self):
        response = self.client.get(self.listar_por_iteracao_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertGreater(len(response_data), 0)

    def test_listar_tarefas(self):
        response = self.client.get(self.listar_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_filtrar_tarefas_pelo_nome_e_pelo_projeto(self):
        response = self.client.get(self.filtrar_url, {'nome_tarefa': 'Tarefa Teste', 'id_projeto': self.projeto.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    # def test_verificar_issue_existe(self):
    #     response = self.client.get(self.verificar_existencia_url, {'id_issue': self.tarefa.id_issue})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertTrue(response.data['exists'])

    # def test_sicronizar_issues(self):
    #     data = [{
    #         'nome': 'Tarefa Sincronizada',
    #         'descricao': 'Descrição da tarefa sincronizada',
    #         'status': 'Pendente',
    #         'tipo': self.tipo,
    #         'projeto': self.projeto
    #     }]
    #     response = self.client.post(self.sicronizar_issues_url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(Tarefa.objects.count(), 2)

    # def test_iniciar_contagem_tempo(self):
    #     membro_projeto = MembroProjeto.objects.create(membro_id=self.user.id, projeto_id=1)
    #     data = {
    #         'membro_projeto_id': membro_projeto.id,
    #         'tarefa_id': self.tarefa.id
    #     }
    #     response = self.client.post(self.iniciar_contagem_tempo_url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_parar_contagem_tempo(self):
    #     membro_projeto = MembroProjeto.objects.create(membro_id=self.user.id, projeto_id=1)
    #     data = {
    #         'membro_projeto_id': membro_projeto.id,
    #         'tarefa_id': self.tarefa.id
    #     }
    #     response = self.client.post(self.parar_contagem_tempo_url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_atualizar_iteracao_tarefas(self):
        tarefa = Tarefa.objects.create(
            nome='Outra Tarefa',
            descricao='Descrição',
            status='Pendente',
            tipo_id=1,
            projeto_id=1,
            iteracao=None
        )
        data = {
            'ids_tarefas': [tarefa.id],
            'id_iteracao': self.iteracao.id
        }
        response = self.client.patch(self.atualizar_iteracao_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        tarefa.refresh_from_db()
        self.assertEqual(tarefa.iteracao, self.iteracao)
