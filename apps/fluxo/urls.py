from django.urls import path
from .views import *

app_name = 'fluxo'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoView.as_view(), name='cadastrar_fluxo' ),
    path('buscar/', BuscarFluxoView.as_view(), name='buscar_fluxo'),
    path('buscar/<int:fluxo_id>/', BuscarFluxoPeloIdView.as_view(), name='buscar_fluxo_pelo_id'),
    path('atualizar/<int:fluxo_id>/', AtualizarFluxoView.as_view(), name='atualizar_fluxo'),
    path('listar/', ListarFluxosView.as_view(), name='listar_fluxos')
]