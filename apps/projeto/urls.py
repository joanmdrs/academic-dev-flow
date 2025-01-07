from django.urls import path
from .views import CadastrarProjetoView, AtualizarFluxoProjetoView, AtualizarProjetoView, BuscarProjetoPorIdView, BuscarProjetosPorNomeView, ExcluirProjetoView, ListarProjetosView

app_name = 'projeto'

urlpatterns = [
    path('cadastrar/', CadastrarProjetoView.as_view(), name='cadastrar_projeto'),
    path('atualizar/', AtualizarProjetoView.as_view(), name='atualizar_projeto'),
    path('buscar-por-nome/', BuscarProjetosPorNomeView.as_view(), name='buscar_projetos_por_nome'),
    path('buscar-por-id/', BuscarProjetoPorIdView.as_view(), name='buscar_projeto_por_id'),
    path('atualizar/fluxo/<int:id>/', AtualizarFluxoProjetoView.as_view(), name='atualizar_fluxo'),
    path('excluir/', ExcluirProjetoView.as_view(), name='excluir_projeto'),
    path('listar/', ListarProjetosView.as_view(), name='listar_projetos')
]