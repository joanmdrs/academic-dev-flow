from django.test import TestCase
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao
from apps.membro.models import Membro
from apps.usuario.models import Usuario
from apps.membro_projeto.models import MembroProjeto
from apps.artefato.models import Artefato
from datetime import date
from django.contrib.auth.models import Group
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError

class ArtefatoModelTest(TestCase):
    
    def setUp(self):
        """Configuração inicial para os testes."""
        self.projeto = Projeto.objects.create(nome="Projeto Teste", data_inicio="2025-01-01", data_termino="2025-06-30")
        
        self.iteracao = Iteracao.objects.create(
            nome="Iteração Teste",
            data_inicio="2025-01-05",
            data_termino="2025-02-25",
            projeto=self.projeto
        )
        
        self.grupo = Group.objects.create(name='TestGroup')
        
        self.usuario = Usuario.objects.create(username="membro.teste@email.com", password="senha")
        self.membro = Membro.objects.create(
            nome="Membro Teste", email="membro.teste@email.com", usuario=self.usuario, grupo=self.grupo)
        
        self.membro1 = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)
        
        self.artefato = {
            "nome": "Artefato Teste",
            "descricao": "Descrição do artefato de teste",
            "status": "pendente",
            "data_termino": "2025-02-20",
            "projeto": self.projeto,
            "iteracao": self.iteracao
        }
    
    def test_criar_artefato(self):
        """Teste: Criar um artefato com dados válidos."""
        artefato = Artefato.objects.create(**self.artefato)
        artefato.membros.add(self.membro1)
        self.assertEqual(Artefato.objects.count(), 1)
        self.assertEqual(artefato.nome, "Artefato Teste")
        self.assertIn(self.membro1, artefato.membros.all())
    
    def test_editar_artefato(self):
        """Teste: Atualizar os dados de um artefato."""
        artefato = Artefato.objects.create(**self.artefato)
        artefato.nome = "Artefato Atualizado"
        artefato.status = "revisao"
        artefato.save()
        artefato_atualizado = Artefato.objects.get(id=artefato.id)
        self.assertEqual(artefato_atualizado.nome, "Artefato Atualizado")
        self.assertEqual(artefato_atualizado.status, "revisao")
    
    def test_deletar_artefato(self):
        """Teste: Excluir um artefato."""
        artefato = Artefato.objects.create(**self.artefato)
        artefato_id = artefato.id
        artefato.delete()
        self.assertFalse(Artefato.objects.filter(id=artefato_id).exists())
    
    def test_str_representacao(self):
        """Teste: Representação em string do modelo."""
        artefato = Artefato.objects.create(**self.artefato)
        self.assertEqual(str(artefato), "Artefato Teste")
        
    def test_criar_artefato_sem_nome(self):
        """Teste para quando se tentar criar um artefato sem nome"""
        self.artefato["nome"] = ""  
        artefato = Artefato(**self.artefato)  
        with self.assertRaises(ValidationError):
            artefato.full_clean()  
            artefato.save()  
            
    def test_validacao_status_invalido(self):
        """Teste: Validar que um status inválido gera erro."""
        self.artefato["status"] = "invalido"  # Define um status inválido
        artefato_teste = Artefato(**self.artefato)
        with self.assertRaises(ValidationError):
            artefato_teste.full_clean()
    
    def test_criar_artefato_sem_iteracao(self):
        """Teste: Criar um artefato sem associar a uma iteração."""
        self.artefato["iteracao"] = None
        artefato = Artefato.objects.create(**self.artefato)
        self.assertIsNone(artefato.iteracao)
    
    def test_excluir_projeto(self):
        """Teste para verificar se o artefato é excluído, mediante exclusão do projeto"""
        Artefato.objects.create(**self.artefato)
        Projeto.objects.all().delete()
        artefatos = Artefato.objects.all()
        self.assertEqual(artefatos.count(), 0)
