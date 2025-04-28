from django.urls import path
from .views_chats import *
from .views_mensagens import *

app_name = 'chat'

urlpatterns = [
    ## Urls do model Chat
    path('cadastrar/', CadastrarChatView.as_view(), name='cadastrar_chat'),
    path('atualizar/', AtualizarChatView.as_view(), name='atualizar_chat'),
    path('buscar-pelo-id/', BuscarChatPeloIDView.as_view(), name='buscar_chat_pelo_id'),
    path('buscar-pelo-id-usuario/', BuscarChatsDosProjetosDoUsuarioView.as_view(), name='buscar_chats_dos_projetos_do_usuario'),
    path('filtrar-pelo-projeto/', FiltrarChatsPorProjetoView.as_view(), name='filtrar_chats_pelo_projeto'),
    path('listar/', ListarChatsView.as_view(), name='listar_chats'),
    path('excluir/', ExcluirChatView.as_view(), name='excluir_chat'),
    ## Urls do model Mensagem
    path('cadastrar-mensagem/', CadastrarMensagemView.as_view(), name='cadastrar_mensagem'),
    path('atualizar-mensagem/', AtualizarMensagemView.as_view(), name='atualizar_mensagem'),
    path('buscar-mensagem-pelo-id/', BuscarMensagemPorIdView.as_view(), name='buscar_mensagem_pelo_id'),
    path('filtrar-mensagens-por-chat/', FiltrarMensagensPorChatView.as_view(), name='filtrar_mensagens_por_chat'),
    path('listar-mensagens/', ListarMensagensView.as_view(), name='listar_mensagens'),
    path('excluir-mensagem/', ExcluirMensagemView.as_view(), name='excluir_mensagem')
]