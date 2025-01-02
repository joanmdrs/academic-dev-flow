from django.urls import path
from .views import *

app_name = 'tags'

urlpatterns = [
    path('cadastrar/', CadastrarTagView.as_view(), name='cadastrar_tag' ),
    path('buscar-pelo-nome/', BuscarTagPeloNomeView.as_view(), name='buscar_tag_pelo_nome'),
    path('buscar-pelo-id/', BuscarTagPeloIdView.as_view(), name='buscar_tag_pelo_id'),
    path('listar/', ListarTagsView.as_view(), name='listar_tags'),
    path('atualizar/', AtualizarTagView.as_view(), name='atualizar_tag'),
    path('excluir/', ExcluirTagsView.as_view(), name='excluir_tags')
]

