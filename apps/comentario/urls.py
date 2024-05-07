from django.urls import path
from .views_tarefas import *
from .views_artefatos import *

app_name = 'comentario'

urlpatterns = [
    path('tarefa/cadastrar/', CadastrarComentarioTarefaView.as_view(), name='cadastrar_comentario_para_a_tarefa'),
    path('tarefa/buscar/', BuscarComentarioTarefaPeloIdView.as_view(), name='buscar_comentario_da_tarefa_pelo_id'),
    path('tarefa/atualizar/<int:id>/', AtualizarComentarioTarefaView.as_view(), name='atualizar_comentario_da_tarefa'),
    path('tarefa/excluir/<int:id>/', ExcluirComentarioTarefaView.as_view(), name='excluir_comentario_da_tarefa'),
    path('tarefa/listar/', ListarComentariosPorTarefaView.as_view(), name='filtrar_comentarios_por_tarefa')
    
]