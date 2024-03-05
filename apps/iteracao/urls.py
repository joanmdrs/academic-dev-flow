from django.urls import path
from .views import *

app_name = 'iteracao'

urlpatterns = [
    path('cadastrar/', CadastrarIteracaoView.as_view(), name='cadastrar_iteracao' ),
    path('buscar/<int:id_projeto>/', BuscarIteracaoPorProjetoView.as_view(), name='buscar_iteracao_por_projeto'),
    
]