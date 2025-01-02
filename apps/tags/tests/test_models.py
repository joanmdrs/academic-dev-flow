from django.test import TestCase
from apps.tags.models import Tag  # Substitua pelo caminho correto do modelo Tag
from django.db import IntegrityError
from django.core.exceptions import ValidationError

class TagModelTests(TestCase):
    
    def test_criar_tag_com_dados_validos(self):
        # Testa a criação de uma tag com dados válidos
        tag = Tag.objects.create(
            nome="Tag 1", 
            descricao="Descrição da Tag 1", 
            cor="#FF5733"
        )
        
        self.assertEqual(tag.nome, "Tag 1")
        self.assertEqual(tag.descricao, "Descrição da Tag 1")
        self.assertEqual(tag.cor, "#FF5733")
        self.assertIsNotNone(tag.data_criacao)  # Verifica se a data de criação foi atribuída corretamente
        
    def test_nome_tag_unico(self):
        # Testa a unicidade do campo 'nome'
        tag1 = Tag.objects.create(nome="Tag Unica", cor="#FF5733")
        
        with self.assertRaises(IntegrityError):
            Tag.objects.create(nome="Tag Unica", cor="#33FF57")  # Tentando criar uma tag com nome duplicado
            
    def test_criar_tag_sem_nome(self):
        # Testa a criação de uma tag sem o campo 'nome', o que deve falhar
        with self.assertRaises(IntegrityError):
            Tag.objects.create(nome=None, cor="#33FF57")
    
    def test_criar_tag_sem_cor(self):
        # Testa a criação de uma tag sem o campo 'cor', o que deve falhar
        with self.assertRaises(IntegrityError):
            Tag.objects.create(nome="Tag sem Cor", cor=None)
    
    def test_criar_tag_com_cor_invalida(self):
        # Testa a criação de uma tag com cor inválida (ex: cor que não segue o formato hexadecimal e tem mais de 7 caracteres)
        tag = Tag(nome="Tag Inválida", cor="invalid-color")
        with self.assertRaises(ValidationError):
            tag.full_clean()
    
    def test_str_tag(self):
        # Testa o método __str__ do modelo Tag
        tag = Tag.objects.create(nome="Tag Teste", cor="#FF5733")
        self.assertEqual(str(tag), "Tag Teste")  # Verifica se o nome é retornado corretamente no __str__
