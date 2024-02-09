from django.urls import path
from .views import *

app_name = 'fluxo_etapa'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoEtapaView.as_view(), name='cadastrar_fluxo_etapa' ),
    path('buscar/<int:idFluxo>/', BuscarFluxoEtapaPeloIdFluxoView.as_view(), name='buscar_fluxo_etapa_pelo_id_fluxo'),
    path('atualizar/<int:id>/', AtualizarEtapaFluxoView.as_view(), name='atualizar_etapa_fluxo'),
    path('excluir/one/<int:id>/', ExcluirEtapaFluxoOneView.as_view(), name='excluir_apenas_uma_etapa'),
    path('excluir/many/<int:idFluxo>/', ExcluirEtapaFluxoManyView.as_view(), name='excluir_varias_etapas')

]