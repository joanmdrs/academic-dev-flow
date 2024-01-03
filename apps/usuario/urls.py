from django.urls import path
from . import views 

urlpatterns = [
    path('usuarios/cadastrar/', CadastrarUsuarioView.as_view(), name='cadastrar_usuario'),
    path('usuarios/<int:id>/buscar/', BuscarUsuarioPorIdView.as_view(), name='buscar_usuario_pelo_id'),
    path('usuarios/<int:id>/excluir/', ExcluirUsuarioView.as_view(), name='excluir_usuario'),
    path('usuarios/<int:id>/atualizar/', AtualizarUsuarioView.as_view(), name='atualizar_usuario'),
]