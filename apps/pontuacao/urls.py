from django.urls import path
from .views import *

app_name = 'pontuacao'

urlpatterns = [
    path('cadastrar/', CadastrarPontuacaoView.as_view(), name='registrar_pontuacao'),
    path('buscar/<int:id>/', BuscarPontuacaoPeloIdView.as_view(), name='buscar_pontuacao_pelo_id'),
    path('atualizar/<int:id>/', AtualizarPontuacaoView.as_view(), name='atualizar_pontuacao'),
    path('excluir/<int:id>/', ExcluirPontuacaoView.as_view(), name='excluir_pontucao'),
    
]