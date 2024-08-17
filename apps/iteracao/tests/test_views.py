from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone 
from apps.usuario.models import Usuario
from apps.projeto.models import Projeto
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto, FuncaoMembroProjeto, FuncaoMembroProjetoAtual
from apps.fluxo_etapa.models import FluxoEtapa
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from apps.iteracao.models import Iteracao
from apps.iteracao.serializers import IteracaoSerializer

class IteracaoAPITestCase(APITestCase):
    def setUp(self):
        """Configura o ambiente de teste criando instâncias necessárias."""
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.membro_projeto = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        self.funcao_lider = FuncaoMembroProjeto.objects.create(nome='Líder de Projeto')
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste", descricao="Descrição do Fluxo Teste")
        self.etapa = Etapa.objects.create(nome="Etapa Teste", descricao="Descrição da Etapa Teste")
        self.fase = FluxoEtapa.objects.create(fluxo=self.fluxo, etapa=self.etapa)
        self.iteracao = Iteracao.objects.create(
            nome="Iteração Teste",
            numero=1,
            descricao="Descrição da Iteração",
            status="criada",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            lider=self.membro_projeto,
            fase=self.fase
        )

    def test_cadastrar_iteracao(self):
        """Testa a criação de uma nova iteração."""
        url = reverse('iteracao:cadastrar_iteracao')
        data = {
            'nome': 'Iteração Nova',
            'numero': 2,
            'descricao': 'Descrição da nova iteração',
            'status': 'criada',
            'data_inicio': '2024-01-15',
            'data_termino': '2024-01-20',
            'projeto': self.projeto.id,
            'lider': self.membro_projeto.id,
            'fase': self.fase.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Iteracao.objects.count(), 2)
    
    def test_listar_iteracoes_por_projeto(self):
        """Testa a listagem de iterações por projeto."""
        url = reverse('iteracao:buscar_iteracao_por_projeto', args=[self.projeto.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_atualizar_iteracao(self):
        """Testa a atualização de uma iteração existente."""
        url = reverse('iteracao:atualizar_iteracao', args=[self.iteracao.id])
        data = {
            'nome': 'Iteração Atualizada',
            'descricao': 'Descrição atualizada',
            'lider': self.membro_projeto.id,
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.iteracao.refresh_from_db()
        self.assertEqual(self.iteracao.nome, 'Iteração Atualizada')
    
    def test_excluir_iteracao(self):
        """Testa a exclusão de iterações."""
        # Adiciona uma iteração para excluir
        iteracao_para_excluir = Iteracao.objects.create(
            nome="Iteração a ser excluída",
            numero=2,
            descricao="Descrição da iteração a ser excluída",
            status="criada",
            data_inicio=timezone.now().date(),
            data_termino=timezone.now().date(),
            projeto=self.projeto,
            lider=self.membro_projeto,
            fase=self.fase
        )
        
        # Verifica se a iteração foi criada
        self.assertEqual(Iteracao.objects.count(), 2)

        # Realiza a exclusão
        url = reverse('iteracao:excluir_iteracao') + f'?ids[]={iteracao_para_excluir.id}'
        response = self.client.delete(url)
        
        # Verifica o status da resposta
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Verifica se a iteração foi excluída
        self.assertEqual(Iteracao.objects.count(), 1)

    
    def test_buscar_iteracao_pelo_id(self):
        """Testa a busca de uma iteração pelo ID."""
        url = reverse('iteracao:buscar_iteracao_pelo_id', args=[self.iteracao.id])
        response = self.client.get(url)
        response_data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data['nome'], self.iteracao.nome)
    
    def test_listar_iteracoes(self):
        """Testa a listagem de todas as iterações."""
        url = reverse('iteracao:listar_iteracoes')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_filtrar_iteracoes_pelo_nome_e_pelo_projeto(self):
        """Testa o filtro de iterações pelo nome e pelo projeto."""
        url = reverse('iteracao:filtrar_iteracoes_pelo_nome_e_pelo_projeto') + f'?nome_iteracao=Iteração Teste&id_projeto={self.projeto.id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nome'], 'Iteração Teste')
