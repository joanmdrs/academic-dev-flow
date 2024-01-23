from django.urls import path
from .views import *

app_name = 'etapa'

urlpatterns = [
    path('cadastrar/', CadastrarEtapaView.as_view(), name='cadastrar_etapa' ),
    path('buscar/', BuscarEtapaPorIdFluxoView.as_view(), name='buscar_etapa_pelo_id'),
    path('buscar/nome/', BuscarEtapaPeloNome.as_view(), name='buscar_etapa_pelo_nome'),
    path('listar/', ListarEtapasView.as_view(), name='listar_etapas'),
    path('atualizar/<int:id>/', AtualizarEtapaView.as_view(), name='atualizar_etapa'),
    path('excluir/<int:id>/', ExcluirEtapaView.as_view(), name='excluir_etapa')
]