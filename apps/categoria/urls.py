from django.urls import path
from .views import *

app_name = 'categoria'

urlpatterns = [
    path('cadastrar/', CadastrarTipoView.as_view(), name='cadastrar_tipo'),
    path('buscar/nome/', BuscarTipoPeloNomeView.as_view(), name='buscar_tipo_pelo_nome'),
    path('atualizar/<int:id>/', AtualizarTipoView.as_view(), name='atualizar_tipo'),
    path('excluir/<int:id>/', ExcluirTipoView.as_view(), name='excluir_tipo'),
    path('listar/', ListarTiposViews.as_view(), name='listar_tipos')
]