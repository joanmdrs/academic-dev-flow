from django.urls import path
from .views import *

app_name = 'fluxo'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoView.as_view(), name='cadastrar_fluxo'),
    path('atualizar/', AtualizarFluxoView.as_view(), name='atualizar_fluxo'),
    path('buscar-por-nome/', BuscarFluxoPeloNomeView.as_view(), name='buscar_fluxo_pelo_nome'),
    path('buscar-por-id/', BuscarFluxoPeloIdView.as_view(), name='buscar_fluxo_pelo_id'),
    path('excluir/', ExcluirFluxoView.as_view(), name='excluir_fluxo'),
    path('listar/', ListarFluxosView.as_view(), name='listar_fluxos')
]