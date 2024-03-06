from django.urls import path
from .views import *

app_name = 'iteracao'

urlpatterns = [
    path('cadastrar/', CadastrarIteracaoView.as_view(), name='cadastrar_iteracao' ),
    path('listar/<int:id_projeto>/', ListarIteracoesPorProjetoView.as_view(), name='buscar_iteracao_por_projeto'),
    path('atualizar/<int:id>/', AtualizarIteracaoView.as_view(), name='atualizar_iteracao'),
    path('excluir/<int:id>/', ExcluirIteracaoView.as_view(), name='excluir_iteracao'),
    
]