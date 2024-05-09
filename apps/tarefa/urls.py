from django.urls import path
from .views import *
from .views_labels import *

app_name='tarefa'

urlpatterns = [
    path('cadastrar/', CadastrarTarefaView.as_view(), name="cadastrar_tarefa"),
    path('buscar/<int:id>/', BuscarTarefaPeloIdView.as_view(), name="buscar_tarefa_pelo_id"),
    path('listar/projeto/<int:id_projeto>/', ListarTarefasPorProjetoView.as_view(), name="listar_tarefas_por_projeto"),
    path('atualizar/<int:id>/', AtualizarTarefaView.as_view(), name="atualizar_tarefa"),
    path('excluir/', ExcluirTarefaView.as_view(), name="excluir_tarefa"),
    path('concluir/', ConcluirTarefasView.as_view(), name="concluir_tarefa"),
    path('reabrir/', ReabrirTarefasView.as_view(), name='reabrir_tarefa'),
    path('listar/iteracao/<int:id_iteracao>/', ListarTarefasPorIteracaoView.as_view(), name='listar_tarefas_por_iteracao'),
    path('listar/', ListarTarefasView.as_view(), name='listar_tarefas'),
    path('filtrar/nome-projeto/', FiltrarTarefasPeloNomeEPeloProjeto.as_view(), name='filtrar_tarefas_pelo_nome_e_pelo_projeto'),
    path('verificar-existencia/', VerificarIssueExisteView.as_view(), name='verificar-existencia_issue'), 
    path('sicronizar-issues/', SicronizarIssuesView.as_view(), name='sicronizar_issues'),
    path('labels/cadastrar/', CadastrarLabelView.as_view(), name='cadastrar_label'),
    path('labels/buscar/<int:id>/', BuscarLabelPeloIdView.as_view(), name='buscar_label_pelo_id'),
    path('labels/listar-por-projeto/<int:id_projeto>/', ListarLabelsPorProjetoView.as_view(), name='listar_labels_por_projeto'),
    path('iniciar-contagem-tempo/', IniciarContagemTempoView.as_view(), name='iniciar-contagem-tempo'),
    path('parar-contagem-tempo/', PararContagemTempoView.as_view(), name='parar-contagem-tempo')
]
