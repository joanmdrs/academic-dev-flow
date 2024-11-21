from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.usuario.models import Usuario
from apps.pontuacao.models import Pontuacao
from apps.membro.models import Membro
from apps.projeto.models import Projeto
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from django.utils import timezone
from decimal import Decimal

class PontuacaoViewsTest(TestCase):
    
    def setUp(self):
        """Configura o ambiente de teste."""
        self.client = APIClient()
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.membro = Membro.objects.create(nome="Membro teste", data_nascimento='2000-12-11', telefone='(84)99999-9999')
        self.membro_projeto = MembroProjeto.objects.create(projeto=self.projeto, membro=self.membro)
        self.pontuacao = Pontuacao.objects.create(
            nota=Decimal('8.50'),
            data_atribuicao=timezone.now(),
            comentario='Comentário de teste',
            autor=self.membro_projeto,
            disponivel=True
        )
    
    def test_cadastrar_pontuacao(self):
        """Testa a criação de um objeto Pontuacao."""
        url = reverse('pontuacao:registrar_pontuacao')
        data = {
            'nota': Decimal('9.75'),
            'data_atribuicao': timezone.now().isoformat(),
            'comentario': 'Novo comentário',
            'autor': self.membro_projeto.id,
            'disponivel': True
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Pontuacao.objects.count(), 2)
    
    def test_buscar_pontuacao_pelo_id(self):
        """Testa a busca de um objeto Pontuacao pelo ID."""
        url = reverse('pontuacao:buscar_pontuacao_pelo_id', args=[self.pontuacao.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['id'], self.pontuacao.id)
        # Use Decimal para comparar com o valor retornado
        self.assertEqual(Decimal(data['nota']), self.pontuacao.nota)
        self.assertEqual(data['comentario'], self.pontuacao.comentario)
    
    def test_atualizar_pontuacao(self):
        """Testa a atualização de um objeto Pontuacao."""
        url = reverse('pontuacao:atualizar_pontuacao', args=[self.pontuacao.id])
        data = {'nota': Decimal('9.00')}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.pontuacao.refresh_from_db()
        self.assertEqual(self.pontuacao.nota, Decimal('9.00'))
    
    def test_excluir_pontuacao(self):
        """Testa a exclusão de um objeto Pontuacao."""
        url = reverse('pontuacao:excluir_pontucao', args=[self.pontuacao.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Pontuacao.objects.count(), 0)

