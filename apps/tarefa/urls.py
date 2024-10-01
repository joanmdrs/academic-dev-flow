from django.urls import path
from .views import *
from .views_labels import *
from .views_categoria import *

app_name='tarefa'

urlpatterns = [
    path('cadastrar/', CadastrarTarefaView.as_view(), name="cadastrar_tarefa"),
    path('atualizar/', AtualizarTarefaView.as_view(), name="atualizar_tarefa"),
    path('buscar-pelo-id/', BuscarTarefaPeloIdView.as_view(), name="buscar_tarefa_pelo_id"),
    path('buscar-pelo-nome-e-pelo-projeto/', BuscarTarefasPeloNomeEPeloProjeto.as_view(), name='buscar_tarefas_pelo_nome_e_pelo_projeto'),
    path('listar/', ListarTarefasView.as_view(), name='listar_tarefas'),

    path('listar-por-projeto/', ListarTarefasPorProjetoView.as_view(), name="listar_tarefas_por_projeto"),
    path('excluir/', ExcluirTarefaView.as_view(), name="excluir_tarefa"),
    path('concluir/', ConcluirTarefasView.as_view(), name="concluir_tarefa"),
    path('reabrir/', ReabrirTarefasView.as_view(), name='reabrir_tarefa'),
    path('listar/iteracao/<int:id_iteracao>/', ListarTarefasPorIteracaoView.as_view(), name='listar_tarefas_por_iteracao'),
    path('verificar-existencia/', VerificarIssueExisteView.as_view(), name='verificar-existencia_issue'), 
    path('sicronizar-issues/', SicronizarIssuesView.as_view(), name='sicronizar_issues'),
    path('iniciar-contagem-tempo/', IniciarContagemTempoView.as_view(), name='iniciar-contagem-tempo'),
    path('parar-contagem-tempo/', PararContagemTempoView.as_view(), name='parar-contagem-tempo'),
    path('atualizar-iteracao/', AtualizarIteracaoTarefasView.as_view(), name='atualizar_iteracao'),
    
    
    path('categoria/cadastrar/', CadastrarCategoriaTarefaView.as_view(), name='cadastrar_categoria_da_tarefa'),
    path('categoria/atualizar/', AtualizarCategoriaTarefaView.as_view(), name='atualizar_categoria_da_tarefa'),
    path('categoria/buscar-pelo-nome/', BuscarCategoriaTarefaPeloNomeView.as_view(), name='buscar_categoria_da_tarefa_pelo_nome'),
    path('categoria/buscar-pelo-id/', BuscarCategoriaTarefaPeloIdView.as_view(), name='buscar_categoria_da_tarefa_pelo_id'),
    path('categoria/listar/', ListarCategoriaTarefaView.as_view(), name='listar_categoria_tarefa'),
    path('categoria/excluir/', ExcluirCategoriaTarefaView.as_view(), name='excluir_categoria')
    
]
