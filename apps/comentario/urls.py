from django.urls import path
from .views_tarefas import CadastrarComentarioTarefaView, BuscarComentarioTarefaPeloIdView, AtualizarComentarioTarefaView, ExcluirComentarioTarefaView, ListarComentariosPorTarefaView
from .views_artefatos import CadastrarComentarioArtefatoView, BuscarComentarioArtefatoPeloIdView, AtualizarComentarioArtefatoView, ExcluirComentarioArtefatoView, ListarComentariosPorArtefatoView

app_name = 'comentario'

urlpatterns = [
    path('tarefa/cadastrar/', CadastrarComentarioTarefaView.as_view(), name='cadastrar_comentario_para_a_tarefa'),
    path('tarefa/buscar/', BuscarComentarioTarefaPeloIdView.as_view(), name='buscar_comentario_da_tarefa_pelo_id'),
    path('tarefa/atualizar/', AtualizarComentarioTarefaView.as_view(), name='atualizar_comentario_da_tarefa'),
    path('tarefa/excluir/', ExcluirComentarioTarefaView.as_view(), name='excluir_comentario_da_tarefa'),
    path('tarefa/listar/', ListarComentariosPorTarefaView.as_view(), name='filtrar_comentarios_por_tarefa'),
    
    path('artefato/cadastrar/', CadastrarComentarioArtefatoView.as_view(), name='cadastrar_comentario_para_o_artefato'),
    path('artefato/buscar/', BuscarComentarioArtefatoPeloIdView.as_view(), name='buscar_comentario_do_artefato_pelo_id'),
    path('artefato/atualizar/', AtualizarComentarioArtefatoView.as_view(), name='atualizar_comentario_do_artefato'),
    path('artefato/excluir/', ExcluirComentarioArtefatoView.as_view(), name='excluir_comentario_do_artefato'),
    path('artefato/listar/', ListarComentariosPorArtefatoView.as_view(), name='filtrar_comentarios_por_artefato'),
]