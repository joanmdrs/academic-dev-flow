from django.urls import path
from .views import *

app_name = 'membro_projeto'

urlpatterns = [
    path('cadastrar/', CadastrarMembroProjetoView.as_view(), name='cadastrar_membro_projeto' ),
    path('buscar/projetos/<int:idUser>/', BuscarProjetosDoMembroView.as_view(), name='buscar_projetos_do_membro'),
    path('buscar/<int:idProjeto>/', BuscarMembroProjetoPeloIdProjetoView.as_view(), name='buscar_membro_projeto_pelo_id_projeto'),
    path('atualizar/<int:id>/', AtualizarMembroProjetoView.as_view(), name='atualizar_membro_projeto'),
    path('excluir/one/<int:id>/', ExcluirMembroProjetoOneView.as_view(), name='excluir_membro_projeto_individual'),
    path('excluir/many/<int:idProjeto>/', ExcluirMembroProjetoManyView.as_view(), name='excluir_membro_projeto_coletivo')
]