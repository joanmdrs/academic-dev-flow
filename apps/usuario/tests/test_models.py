from django.test import TestCase
from django.utils import timezone
from apps.usuario.models import Usuario

class UsuarioModelTest(TestCase):
    def setUp(self):
        # Cria uma instância do modelo Usuario para uso nos testes
        self.usuario = Usuario.objects.create_user(
            username='testuser',
            password='testpassword',
            email='testuser@example.com'
        )

    def test_usuario_criacao(self):
        # Verifica se o Usuario foi criado corretamente
        self.assertEqual(self.usuario.username, 'testuser')
        self.assertTrue(self.usuario.check_password('testpassword'))
        self.assertEqual(self.usuario.email, 'testuser@example.com')

    def test_data_criacao(self):
        # Verifica se o campo data_criacao é preenchido automaticamente
        now = timezone.now()
        self.assertTrue(self.usuario.data_criacao <= now)

    def test_str_representation(self):
        # Verifica a representação em string do Usuario
        self.assertEqual(str(self.usuario), 'testuser')
