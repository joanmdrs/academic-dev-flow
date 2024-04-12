from django.urls import path
from .views import *

app_name = 'artefato'

urlpatterns = [
    path('cadastrar/', CadastrarArtefatoView.as_view(), name='cadastrar_artefato'),
    path('buscar/', BuscarArtefatoPorNomeView.as_view(), name='buscar_artefato'),
    path('atualizar/<int:id>/', AtualizarArtefatoView.as_view(), name='atualizar_artefato'),
    path('excluir/<int:id>/', ExcluirArtefatoView.as_view(), name='excluir_artefato'),
    path('listar/', ListarArtefatosView.as_view(), name="listar_artefatos"),
    path('filtrar/nome-projeto/', FiltrarArtefatoPeloNomeEProjeto.as_view(), name='filtrar_artefato_pelo_nome_e_pelo_projeto'),
    path('verificar-existencia/', VerificarExistenciaArquivoView.as_view(), name='verificar-se-arquivo-já-existe')
]