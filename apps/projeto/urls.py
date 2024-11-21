from django.urls import path
from .views import *

app_name = 'projeto'

urlpatterns = [
    path('cadastrar/', CadastrarProjetoView.as_view(), name='cadastrar_projeto'),
    path('atualizar/', AtualizarProjetoView.as_view(), name='atualizar_projeto'),

    path('buscar-por-nome/', BuscarProjetosPorNomeView.as_view(), name='buscar_projetos_por_nome'),
    path('buscar_por_id/<int:id>/', ListarProjetoPorIdView.as_view(), name='buscar_projeto_pelo_id'),
    path('buscar_por_lista_ids/', BuscarProjetosPorListaDeIdsView.as_view(), name='buscar_projetos_por_lista_ids'),
    path('atualizar/fluxo/<int:id>/', AtualizarFluxoProjetoView.as_view(), name='atualizar_fluxo'),
    path('excluir/', ExcluirProjetoView.as_view(), name='excluir_projeto'),
    path('listar/', ListarProjetosView.as_view(), name='listar_projetos')
]