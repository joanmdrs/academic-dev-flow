from django.urls import path
from .views import *

app_name = 'comentario'

urlpatterns = [
    path('cadastrar/', CadastrarComentarioView.as_view(), name='cadastrar_comentario'),
    path('buscar/<int:id>/', BuscarComentarioPeloIdView.as_view(), name='buscar_comentario_pelo_id'),
    path('atualizar/<int:id>/', AtualizarComentarioView.as_view(), name='atualizar_comentario'),
    path('excluir/<int:id>/', ExcluirComentarioView.as_view(), name='excluir_comentario'),
    
]