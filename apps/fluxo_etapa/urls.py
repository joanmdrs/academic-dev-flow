from django.urls import path
from .views import *

app_name = 'fluxo_etapa'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoEtapaView.as_view(), name='cadastrar_fluxo_etapa' ),
    path('filtrar-por-fluxo/', FiltrarFluxoEtapaPorFluxoView.as_view(), name='buscar_fluxo_etapa_pelo_id_fluxo'),
    path('atualizar/<int:id>/', AtualizarEtapaFluxoView.as_view(), name='atualizar_etapa_fluxo'),
    path('excluir/', ExcluirEtapaFluxoView.as_view(), name='excluir_etapa_fluxo'),
    path('listar/', ListarFluxoEtapasView.as_view(), name='listar_fluxo_etapas')

]