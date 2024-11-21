from django.urls import path
from .views_tarefa import *
from .views_categoria import *
from .views_intervalo_tempo import *

app_name='tarefa'

urlpatterns = [
    path('cadastrar/', CadastrarTarefaView.as_view(), name="cadastrar_tarefa"),
    path('atualizar/', AtualizarTarefaView.as_view(), name="atualizar_tarefa"),
    path('atualizar-status/', AtualizarStatusTarefaView.as_view(), name='atualizar_status_tarefa'),
    path('atualizar-iteracao/', AtualizarIteracaoTarefasView.as_view(), name='atualizar_iteracao_tarefa'),
    path('buscar-pelo-id/', BuscarTarefaPeloIdView.as_view(), name="buscar_tarefa_pelo_id"),
    path('buscar-pelo-nome-e-pelo-projeto/', BuscarTarefasPeloNomeEPeloProjeto.as_view(), name='buscar_tarefas_pelo_nome_e_pelo_projeto'), 
    path('listar/', ListarTarefasView.as_view(), name='listar_tarefas'),
    path('listar-por-projeto/', ListarTarefasPorProjetoView.as_view(), name="listar_tarefas_por_projeto"),
    path('listar-por-iteracao/', ListarTarefasPorIteracaoView.as_view(), name='listar_tarefas_por_iteracao'),
    path('listar-tarefas-dos-projetos-do-membro/', ListarTarefasDosProjetosDoMembroView.as_view(), name='listar_tarefas_dos_projetos_do_membro'),
    path('filtrar-por-projeto-e-por-membro/', FiltrarTarefasPorMembroEPorProjetoView.as_view(), name='filtrar-por-projeto-e-por-membro'),
    path('excluir/', ExcluirTarefaView.as_view(), name="excluir_tarefa"),
    
    path('iniciar-contagem-tempo/', IniciarContagemTempoView.as_view(), name='iniciar_contagem_tempo'),
    path('parar-contagem-tempo/', PararContagemTempoView.as_view(), name='parar_contagem_tempo'), 
    
    path('categoria/cadastrar/', CadastrarCategoriaTarefaView.as_view(), name='cadastrar_categoria_da_tarefa'),
    path('categoria/atualizar/', AtualizarCategoriaTarefaView.as_view(), name='atualizar_categoria_da_tarefa'),
    path('categoria/buscar-pelo-nome/', BuscarCategoriaTarefaPeloNomeView.as_view(), name='buscar_categoria_da_tarefa_pelo_nome'),
    path('categoria/buscar-pelo-id/', BuscarCategoriaTarefaPeloIdView.as_view(), name='buscar_categoria_da_tarefa_pelo_id'),
    path('categoria/listar/', ListarCategoriaTarefaView.as_view(), name='listar_categoria_tarefa'),
    path('categoria/excluir/', ExcluirCategoriaTarefaView.as_view(), name='excluir_categoria'),
    
    path('verificar-existencia/', VerificarIssueExisteView.as_view(), name='verificar-existencia_issue'), 
    path('sicronizar-issues/', SicronizarIssuesView.as_view(), name='sicronizar_issues'),
    
]
