from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.artefato.models import Artefato
from apps.projeto.models import Projeto
from apps.iteracao.models import Iteracao
from apps.usuario.models import Usuario

class ArtefatoViewsTest(APITestCase):
    
    def setUp(self):
        self.user = Usuario.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        
        self.projeto = Projeto.objects.create(nome="Projeto Exemplo", data_inicio='2024-08-17', data_fim='2024-08-30')
        self.iteracao = Iteracao.objects.create(nome="Iteração 1", numero=1, data_inicio='2024-08-17', data_termino='2024-08-30')
        
        self.artefato = Artefato.objects.create(
            nome="Artefato Exemplo",
            projeto=self.projeto,
            iteracao=self.iteracao
        )
    
    def test_cadastrar_artefato(self):
        url = reverse('artefato:cadastrar_artefato')
        data = {
            "nome": "Novo Artefato",
            "projeto": self.projeto.id,
            "iteracao": self.iteracao.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], "Novo Artefato")
    
    def test_buscar_artefato_por_nome(self):
        url = reverse('artefato:buscar_artefato_pelo_nome') + '?nome=Artefato'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertEqual(response_data[0]['nome'], "Artefato Exemplo")
    
    def test_buscar_artefato_pelo_id(self):
        url = reverse('artefato:buscar_artefato_pelo_id', args=[self.artefato.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertEqual(response_data['nome'], "Artefato Exemplo")
        
    def test_listar_artefatos(self):
        url = reverse('artefato:listar_artefatos')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['nome'], "Artefato Exemplo")
    
    def test_atualizar_artefato(self):
        url = reverse('artefato:atualizar_artefato', args=[self.artefato.id])
        data = {"nome": "Artefato Atualizado"}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], "Artefato Atualizado")
    
    def test_excluir_artefato(self):
        url = reverse('artefato:excluir_artefato', args=[self.artefato.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
