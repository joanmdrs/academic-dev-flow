# apps/usuario/urls.py

from django.urls import path
from .views import *

app_name = 'usuario'

urlpatterns = [
    path('cadastrar/', CadastrarUsuarioView.as_view(), name='cadastrar_usuario'),
    path('<int:id>/buscar/', BuscarUsuarioPorIdView.as_view(), name='buscar_usuario_pelo_id'),
    path('<int:id>/excluir/', ExcluirUsuarioView.as_view(), name='excluir_usuario'),
    path('<int:id>/atualizar/', AtualizarUsuarioView.as_view(), name='atualizar_usuario'),
]
