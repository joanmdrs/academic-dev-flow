from django.test import TestCase
from apps.usuario.models import Usuario
from apps.membro.models import Membro
from django.contrib.auth.models import Group
from django.db.utils import IntegrityError

class MembroModelTest(TestCase):
    def setUp(self):
        """Configura o ambiente de teste criando instâncias necessárias."""
        self.grupo = Group.objects.create(name="TestGroup")

        self.usuario = Usuario.objects.create(
            username="membro.teste@email.com",
            password="senha"
        )

        self.membro = Membro.objects.create(
            nome="Membro de teste",
            data_nascimento="2000-12-11",
            sexo="M",
            telefone="123456789",
            email="membro.teste@email.com",
            linkedin="https://linkedin.com/in/membro",
            lattes="https://lattes.com/membro",
            nome_github="membro-teste",
            email_github="github.membro@email.com",
            usuario_github="membro-github",
            usuario=self.usuario,
            grupo=self.grupo,
            avatar=1
        )

    def test_str_representation(self):
        """Teste da representação em string do modelo."""
        self.assertEqual(str(self.membro), "Membro de teste")

    def test_valores_dos_campos(self):
        """Teste dos valores dos campos atribuídos corretamente."""
        self.assertEqual(self.membro.nome, "Membro de teste")
        self.assertEqual(self.membro.data_nascimento, "2000-12-11")
        self.assertEqual(self.membro.sexo, "M")
        self.assertEqual(self.membro.telefone, "123456789")
        self.assertEqual(self.membro.email, "membro.teste@email.com")
        self.assertEqual(self.membro.linkedin, "https://linkedin.com/in/membro")
        self.assertEqual(self.membro.lattes, "https://lattes.com/membro")
        self.assertEqual(self.membro.nome_github, "membro-teste")
        self.assertEqual(self.membro.email_github, "github.membro@email.com")
        self.assertEqual(self.membro.usuario_github, "membro-github")
        self.assertEqual(self.membro.usuario, self.usuario)
        self.assertEqual(self.membro.grupo, self.grupo)
        self.assertEqual(self.membro.avatar, 1)

    def test_valor_padrao_campo_sexo(self):
        """Teste do valor padrão do campo sexo."""
        membro_sem_sexo = Membro.objects.create(
            nome="Sem Sexo",
            email="sem.sexo@email.com",
        )
        self.assertEqual(membro_sem_sexo.sexo, "O")

    def test_usuario_github_unico(self):
        """Teste para garantir que o campo usuario_github é único."""
        with self.assertRaises(IntegrityError):
            Membro.objects.create(
                nome="Outro Membro",
                email="outro@email.com",
                usuario_github="membro-github",  # Mesmo valor do campo único
                usuario=self.usuario
            )

    def test_grupo_null_ao_deletar(self):
        """Teste para verificar se o grupo é definido como null ao ser deletado."""
        self.grupo.delete()
        self.membro.refresh_from_db()
        self.assertIsNone(self.membro.grupo)
