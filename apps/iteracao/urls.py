from django.urls import path
from .views import *

app_name = 'iteracao'

urlpatterns = [
    path('cadastrar/', CadastrarIteracaoView.as_view(), name='cadastrar_iteracao' ),
]