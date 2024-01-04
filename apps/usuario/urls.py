# apps/usuario/urls.py

from django.urls import path
from .views import *

app_name = 'usuario'

urlpatterns = [
    path('cadastrar/', CadastrarUsuarioView.as_view(), name='cadastrar_usuario'),
    path('buscar/<int:id>/', BuscarUsuarioPorIdView.as_view(), name='buscar_usuario_pelo_id'),
    path('excluir/<int:id>/', ExcluirUsuarioView.as_view(), name='excluir_usuario'),
    path('atualizar/<int:id>/', AtualizarUsuarioView.as_view(), name='atualizar_usuario'),
]
