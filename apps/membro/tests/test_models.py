from django.test import TestCase
from apps.usuario.models import Usuario
from apps.membro.models import Membro, UsuarioGithub

class MembroModelTest(TestCase):
    
    def setUp(self):
        """Configura o ambiente de teste criando instâncias necessárias."""
        self.usuario_github = UsuarioGithub.objects.create(
            nome='Usuário Github Teste',
            email_github='usuario@github.com',
            usuario_github='usuario_test'
        )
        
        self.usuario = Usuario.objects.create_user(
            username='testuser',
            password='testpassword'
        )
    
    def test_membro_criacao(self):
        """Testa a criação de uma instância do modelo Membro."""
        membro = Membro.objects.create(
            nome='Membro Teste',
            data_nascimento='2000-12-11',
            telefone='(84)99999-9999',
            email='membro@teste.com',
            github=self.usuario_github,
            linkedin='https://linkedin.com/in/membro_teste',
            lattes='http://lattes.cnpq.br/1234567890123456',
            grupo='Grupo Teste',
            usuario=self.usuario
        )
        self.assertTrue(isinstance(membro, Membro))
        self.assertEqual(membro.__str__(), 'Membro Teste')
    
    def test_campos_obrigatorios(self):
        """Testa a criação de Membro com campos obrigatórios."""
        membro = Membro(
            nome='Membro Teste',
            data_nascimento='2000-12-11',
            telefone='(84)99999-9999',
            email='membro@teste.com'
        )
        membro.save()
        self.assertEqual(Membro.objects.count(), 1)
        self.assertEqual(membro.nome, 'Membro Teste')
    
    def test_campos_opcionais(self):
        """Testa a criação de Membro com campos opcionais."""
        membro = Membro(
            nome='Membro Teste',
            data_nascimento='2000-12-11',
            telefone='(84)99999-9999',
            email='membro@teste.com',
            linkedin='https://linkedin.com/in/membro_teste'
        )
        membro.save()
        self.assertEqual(membro.linkedin, 'https://linkedin.com/in/membro_teste')
        self.assertIsNone(membro.github)
    
    def test_referencia_usuario_github(self):
        """Testa a referência ao modelo UsuarioGithub."""
        membro = Membro.objects.create(
            nome='Membro com Github',
            data_nascimento='2000-12-11',
            telefone='(84)99999-9999',
            email='membro@teste.com',
            github=self.usuario_github
        )
        self.assertEqual(membro.github, self.usuario_github)
    
    def test_referencia_usuario(self):
        """Testa a referência ao modelo Usuario."""
        membro = Membro.objects.create(
            nome='Membro com Usuario',
            data_nascimento='2000-12-11',
            telefone='(84)99999-9999',
            email='membro@teste.com',
            usuario=self.usuario
        )
        self.assertEqual(membro.usuario, self.usuario)
