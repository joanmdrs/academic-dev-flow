from django.urls import path
from .views import *

app_name = 'fluxo_etapa'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoEtapaView.as_view(), name='cadastrar_fluxo_etapa' ),
    path('filtrar-por-fluxo/', FiltrarFluxoEtapaPorFluxoView.as_view(), name='buscar_fluxo_etapa_pelo_id_fluxo'),
    path('atualizar/', AtualizarEtapaFluxoView.as_view(), name='atualizar_fluxo_etapa'),
    path('excluir/', ExcluirEtapaFluxoView.as_view(), name='excluir_fluxo_etapa'),
    path('listar/', ListarFluxoEtapasView.as_view(), name='listar_fluxo_etapa')

]