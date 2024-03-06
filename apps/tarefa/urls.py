from django.urls import path
from .views import *

app_name='tarefa'

urlpatterns = [
    path('cadastrar/', CadastrarTarefaView.as_view(), name="cadastrar_tarefa")
]
