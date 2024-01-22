from django.urls import path
from .views import *

app_name = 'fluxo'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoView.as_view(), name='cadastrar_fluxo' ),
    path('buscar/', BuscarFluxoView.as_view(), name='buscar_fluxo'),
    path('buscar/<int:fluxo_id>/', BuscarFluxoPeloIdView.as_view(), name='buscar_fluxo_pelo_id'),
    path('listar/', ListarFluxosView.as_view(), name='listar_fluxos')
]