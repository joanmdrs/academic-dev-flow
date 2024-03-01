from django.urls import path
from .views import *

app_name = 'projeto'

urlpatterns = [
    path('cadastrar/', CadastrarProjetoView.as_view(), name='cadastrar_projeto'),
    path('buscar/', BuscarProjetosPorNomeView.as_view(), name='buscar_projetos_por_nome'),
    path('buscar_por_id/<int:id>/', BuscarProjetoPorIdView.as_view(), name='buscar_projeto_pelo_id'),
    path('excluir/<int:id>/', ExcluirProjetoView.as_view(), name='excluir_projeto'),
    path('atualizar/<int:id>/', AtualizarProjetoView.as_view(), name='atualizar_projeto'),
    path('atualizar/fluxo/<int:id>/', AtualizarFluxoProjetoView.as_view(), name='atualizar_fluxo')
]