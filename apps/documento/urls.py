from django.urls import path
from .views import *

app_name = 'documento'

urlpatterns = [
    path('cadastrar/', CadastrarDocumentoView.as_view(), name='cadastrar_documento'),
    path('buscar/<int:id>/', BuscarDocumentoPeloIdView.as_view(), name='buscar_documento_pelo_id'),
    path('filtrar/<int:id_projeto>/', FiltrarDocumentosPorProjetoView.as_view(), name='filtrar_documentos por projeto'),
    path('atualizar/<int:id>/', AtualizarDocumentoView.as_view(), name='atualizar_documento'),
    path('excluir/', ExcluirDocumentosView.as_view(), name='excluir_documentos'),
    
]