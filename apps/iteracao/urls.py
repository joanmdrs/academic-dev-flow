from django.urls import path
from .views import *

app_name = 'iteracao'

urlpatterns = [
    
    path('cadastrar/', CadastrarIteracaoView.as_view(), name='cadastrar_iteracao' ),
    path('buscar-pelo-id/', BuscarIteracaoPeloId.as_view(), name='buscar_iteracao_pelo_id'),
    path('listar-por-projeto/', ListarIteracoesPorProjetoView.as_view(), name='buscar_iteracao_por_projeto'),
    path('atualizar/', AtualizarIteracaoView.as_view(), name='atualizar_iteracao'),
    path('excluir/', ExcluirIteracoesView.as_view(), name='excluir_iteracao'),
    path('listar/', ListarIteracoesView.as_view(), name="listar_iteracoes"),
    path('filtrar-por-nome-e-por-projeto/', FiltrarIteracoesPeloNomeEPeloProjeto.as_view(), name='filtrar_iteracoes_pelo_nome_e_pelo_projeto'),
    path('buscar-iteracoes-dos-projetos-do-membro/', BuscarIteracoesDosProjetosDoMembroView.as_view(), 
        name='buscar_iteracoes_dos_projetos_do_membro'),
    path('buscar-ultima-iteracao/', BuscarUltimaIteracaoDoProjetoView.as_view(), name='buscar_ultima_iteracao_do_projeto'),
    path('buscar-iteracoes-adjacentes/', BuscarIteracoesAdjacentesView.as_view(), name='buscar_iteracoes_adjacentes'),
    path('buscar-iteracao-atual-do-projeto/', BuscarIteracaoAtualDoProjetoView.as_view(), name='buscar_iteracao_atual_do_projeto')
    
]