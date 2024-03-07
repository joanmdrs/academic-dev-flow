from django.urls import path
from .views import *

app_name='tarefa'

urlpatterns = [
    path('cadastrar/', CadastrarTarefaView.as_view(), name="cadastrar_tarefa"),
    path('buscar/<int:id>/', BuscarTarefaPeloIdView.as_view(), name="buscar_tarefa_pelo_id"),
    path('listar/projeto/<int:id_projeto>/', ListarTarefasPorProjetoView.as_view(), name="listar_tarefas_por_projeto"),
    path('atualizar/<int:id>/', AtualizarTarefaView.as_view(), name="atualizar_tarefa"),
    path('excluir/', ExcluirTarefaView.as_view(), name="excluir_tarefa"),
    path('concluir/', ConcluirTarefasView.as_view(), name="concluir_tarefa"),
    path('reabrir/', ReabrirTarefasView.as_view(), name='reabrir_tarefa')
]
