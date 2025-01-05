from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.etapa.models import Etapa 
from django.core.exceptions import ValidationError

User = get_user_model()

class EtapaModelTest(TestCase):

    def setUp(self):
        # Criação de um usuário para associar às etapas
        self.user = User.objects.create_user(username='testuser', password='testpass')
        

        # Criação de uma etapa
        self.etapa = Etapa.objects.create(
            nome="Etapa Teste",
            descricao="Descrição da etapa de teste.",
            created_by=self.user
        )

    def test_etapa_criada_com_sucesso(self):
        """Testa se uma etapa foi criada corretamente"""
        etapa = Etapa.objects.get(id=self.etapa.id)
        self.assertEqual(etapa.nome, "Etapa Teste")
        self.assertEqual(etapa.descricao, "Descrição da etapa de teste.")
        self.assertEqual(etapa.created_by, self.user)

    def test_etapa_quando_usuario_excluido(self):
        """Testa o comportamento do modelo quando o usuário associado é excluído"""
        self.user.delete() 
        etapa = Etapa.objects.get(id=self.etapa.id)
        self.assertIsNone(etapa.created_by) 

    def test_str_representation(self):
        """Testa a representação em string do modelo"""
        self.assertEqual(str(self.etapa), "Etapa Teste")

    def test_criar_etapa_sem_nome(self):
        """Teste para quando se tentar criar um artefato sem nome"""
        etapa_teste = {
            "nome": None,
            "descricao": "Descrição da etapa"
        }
        etapa = Etapa(**etapa_teste)  
        with self.assertRaises(ValidationError):
            etapa.full_clean()  
            etapa.save()  
