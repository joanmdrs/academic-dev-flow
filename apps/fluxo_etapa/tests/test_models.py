from django.test import TestCase
from django.utils import timezone
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from apps.fluxo_etapa.models import FluxoEtapa
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

class FluxoEtapaModelTest(TestCase):
        
    def setUp(self):
        # Criar um usuário para associar ao campo `created_by`
        User = get_user_model()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.fluxo = Fluxo.objects.create(nome="Fluxo Teste")
        self.etapa = Etapa.objects.create(nome="Etapa Teste")

        # Act
        self.fluxo_etapa = FluxoEtapa.objects.create(
            fluxo=self.fluxo,
            etapa=self.etapa,
            ordem_no_fluxo=1,
            created_by=self.user,
        )

    def test_criacao_fluxo_etapa(self):
        """Testa a criação de uma instância de FluxoEtapa com dados válidos"""

    
        fluxo_etapa = FluxoEtapa.objects.create(
            fluxo=self.fluxo,
            etapa=self.etapa,
            ordem_no_fluxo=2,
            created_by=self.user
        )
        
        self.assertEqual(fluxo_etapa.fluxo, self.fluxo)
        self.assertEqual(fluxo_etapa.etapa, self.etapa)
        self.assertEqual(fluxo_etapa.ordem_no_fluxo, 2)
        self.assertEqual(fluxo_etapa.created_by, self.user)


    def test_atualizar_fluxo_etapa(self):
        """Testa a atualização de uma instância de FluxoEtapa"""
        fluxo_novo = Fluxo.objects.create(nome="Fluxo Novo")
        self.fluxo_etapa.fluxo = fluxo_novo
        self.fluxo_etapa.ordem_no_fluxo = 4
        self.fluxo_etapa.save()

        fluxo_etapa_atualizado = FluxoEtapa.objects.get(id=self.fluxo_etapa.id)

        self.assertEqual(fluxo_etapa_atualizado.fluxo, fluxo_novo)
        self.assertEqual(fluxo_etapa_atualizado.ordem_no_fluxo, 4)
        self.assertEqual(fluxo_etapa_atualizado.etapa, self.etapa)
        self.assertIsNotNone(fluxo_etapa_atualizado.data_adicao)
        
    def test_criar_fluxo_etapa_dados_invalidos(self):
        """Testa a criação de uma instância de FluxoEtapa com dados inválidos"""
        
        dados_invalidos = {
            "fluxo": None,
            "etapa": None
        }
        
        fluxo_etapa = FluxoEtapa(**dados_invalidos)  
        with self.assertRaises(ValidationError):
            fluxo_etapa.full_clean()  
            fluxo_etapa.save()  
            
    def test_fluxo_etapa_excluir_user(self):
        """Testa o que acontece com a instância de FluxoEtapa ao excluir o usuário"""
        self.user.delete()  
        self.fluxo_etapa.refresh_from_db() 
        self.assertIsNone(self.fluxo_etapa.created_by)  
        
    def test_fluxo_etapa_str_method(self):
        """Testa o método __str__ do modelo FluxoEtapa"""
        self.assertEqual(str(self.fluxo_etapa), 'Etapa Teste')
