from django.urls import path
from .views import *

app_name = 'release'

urlpatterns = [
    
    path('cadastrar/', CadastrarReleaseView.as_view(), name='cadastrar_release' ),
    path('atualizar/', AtualizarReleaseView.as_view(), name='atualizar_release'),
    path('buscar-pelo-id/', BuscarReleasePeloIDView.as_view(), name='buscar_release_pelo_id'),
    path('buscar-pelo-nome-e-pelo-projeto/', BuscarReleasesPeloNomeEPeloProjeto.as_view(), name='buscar_releases_pelo_nome_e_pelo_projeto'),
    path('listar/', ListarReleasesView.as_view(), name='listar_releases'),
    path('listar-por-projeto/', ListarReleasesPorProjetoView.as_view(), name='listar_releases_por_projeto'),
    path('excluir/', ExcluirReleasesView.as_view(), name='excluir_releases')
]