from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.fluxo.models import Fluxo
from django.core.exceptions import ValidationError

class FluxoModelTest(TestCase):

    def setUp(self):
        # Criar um usuário para associar ao campo `created_by`
        self.user = get_user_model().objects.create_user(
            username='testuser',
            password='testpassword123'
        )
        # Criar um objeto Fluxo
        self.fluxo = Fluxo.objects.create(
            nome='Teste de Fluxo',
            descricao='Descrição do fluxo de teste.',
            created_by=self.user
        )

    def test_criar_fluxo(self):
        """Testa se o objeto Fluxo é criado corretamente"""
        self.assertEqual(self.fluxo.nome, 'Teste de Fluxo')
        self.assertEqual(self.fluxo.descricao, 'Descrição do fluxo de teste.')
        self.assertEqual(self.fluxo.created_by, self.user)
        self.assertIsNotNone(self.fluxo.data_criacao)

    def test_fluxo_str_method(self):
        """Testa o método __str__ do modelo Fluxo"""
        self.assertEqual(str(self.fluxo), 'Teste de Fluxo')

    def test_fluxo_created_by_null(self):
        """Testa se o campo created_by pode ser null"""
        fluxo_sem_usuario = Fluxo.objects.create(
            nome='Fluxo sem usuário',
            descricao='Fluxo de teste sem usuário associado.'
        )
        self.assertIsNone(fluxo_sem_usuario.created_by)

    def test_fluxo_blank_descricao(self):
        """Testa se o campo descricao pode ser blank"""
        fluxo_blank_descricao = Fluxo.objects.create(
            nome='Fluxo sem descrição',
            created_by=self.user
        )
        self.assertIsNone(fluxo_blank_descricao.descricao)

    def test_criar_fluxo_sem_nome(self):
        """Teste para quando se tentar criar um artefato sem nome"""
        fluxo_teste = {
            "nome": None,
            "descricao": "Descrição do fluxo"
        }
        fluxo = Fluxo(**fluxo_teste)  
        with self.assertRaises(ValidationError):
            fluxo.full_clean()  
            fluxo.save()  
            
    def test_fluxo_when_user_deleted(self):
        """Testa o comportamento do campo created_by quando o usuário é excluído"""
        self.user.delete()  
        self.fluxo.refresh_from_db() 
        self.assertIsNone(self.fluxo.created_by)  