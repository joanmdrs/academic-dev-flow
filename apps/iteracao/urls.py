from django.urls import path
from .views import *

app_name = 'iteracao'

urlpatterns = [
    path('cadastrar/', CadastrarIteracaoView.as_view(), name='cadastrar_iteracao' ),
    path('buscar/<int:id>/', BuscarIteracaoPeloId.as_view(), name='buscar_iteracao_pelo_id'),
    path('listar/<int:id_projeto>/', ListarIteracoesPorProjetoView.as_view(), name='buscar_iteracao_por_projeto'),
    path('atualizar/<int:id>/', AtualizarIteracaoView.as_view(), name='atualizar_iteracao'),
    path('excluir/', ExcluirIteracaoView.as_view(), name='excluir_iteracao'),
    path('listar/', ListarIteracoesView.as_view(), name="listar_iteracoes")
    
]