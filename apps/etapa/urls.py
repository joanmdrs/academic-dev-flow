from django.urls import path
from .views import CadastrarEtapaView, AtualizarEtapaView, BuscarEtapaPeloIdView, BuscarEtapaPeloNomeView, ListarEtapasView, ExcluirEtapasView

app_name = 'etapa'

urlpatterns = [
    path('cadastrar/', CadastrarEtapaView.as_view(), name='cadastrar_etapa' ),
    path('atualizar/', AtualizarEtapaView.as_view(), name='atualizar_etapa'),
    path('buscar-por-id/', BuscarEtapaPeloIdView.as_view(), name='buscar_etapa_pelo_id'),
    path('buscar-por-nome/', BuscarEtapaPeloNomeView.as_view(), name='buscar_etapa_pelo_nome'),
    path('listar/', ListarEtapasView.as_view(), name='listar_etapas'),
    path('excluir/', ExcluirEtapasView.as_view(), name='excluir_etapas')
]

