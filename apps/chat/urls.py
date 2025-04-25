from django.urls import path
from .views_chats import *
from .views_mensagens import *

app_name = 'chat'

urlpatterns = [
    path('cadastrar/', CadastrarChatView.as_view(), name='cadastrar_chat'),
    path('atualizar/', AtualizarChatView.as_view(), name='atualizar_chat'),
    path('buscar-pelo-id/', BuscarChatPeloIDView.as_view(), name='buscar_chat_pelo_id'),
    path('filtrar-pelo-projeto/', FiltrarChatsPorProjetoView.as_view(), name='filtrar_chats_pelo_projeto'),
    path('listar/', ListarChatsView.as_view(), name='listar_chats'),
    path('excluir/', ExcluirChatView.as_view(), name='excluir_chat')
    
]