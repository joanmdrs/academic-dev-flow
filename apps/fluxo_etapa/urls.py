from django.urls import path
from .views import *

app_name = 'fluxo_etapa'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoEtapaView.as_view(), name='cadastrar_vinculo_fluxo_etapa' ),
    path('buscar/<int:idFluxo>/', BuscarFluxoEtapaPeloIdFluxoView.as_view(), name='buscar_fluxo_etapa_pelo_id_fluxo'),
    path('excluir/<int:idFluxo>/', ExcluirFluxoEtapasView.as_view(), name='excluir_vinculos_fluxo_etapa'),
    path('excluir/<int:idFluxo>/<int:idEtapa>/', ExcluirFluxoEtapaView.as_view(), name='excluir_vinculo_fluxo_etapa')
]

