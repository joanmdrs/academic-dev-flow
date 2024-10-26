from django.urls import path
from .views import *

app_name = 'membro-projeto'

urlpatterns = [
    path('cadastrar/', CadastrarMembroProjetoView.as_view(), name='cadastrar_membro_projeto' ),
    path('atualizar/', AtualizarMembroProjetoView.as_view(), name='atualizar_membro_projeto'),
    path('excluir/', ExcluirMembroProjetoView.as_view(), name='excluir_membro_projeto_individual'),
    path('buscar-pelo-id-membro-e-pelo-id-projeto/', BuscarMembroProjetoPeloIdMembroEPeloIdProjeto.as_view(), name='buscar_pelo_id_membro_e_id_projeto'),
    path('buscar-projetos-do-membro/', BuscarProjetosDoMembroView.as_view(), name='buscar_projetos_do_membro'),
    path('buscar-membros-por-projeto/', BuscarMembrosPorProjetoView.as_view(), name='buscar_membro_projeto_por_projeto'),
    path('listar/', ListarMembroProjetoView.as_view(), name='listar_membro_projeto'),
    path('listar-equipes/', ListarEquipesDoMembroView.as_view(), name='listar_equipes')
]

