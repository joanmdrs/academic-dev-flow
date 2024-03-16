from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Documento
from .serializers import DocumentoSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarDocumentoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request): 
        try:
            serializer = DocumentoSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class BuscarDocumentoPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try:
            documento = Documento.objects.get(pk=id)
            serializer = DocumentoSerializer(documento, many=False)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarDocumentosPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto): 
        try:
            documentos = Documento.objects.filter(projeto_id=id_projeto)  
            documentos_info = []

            for documento in documentos:
                
                documentos_info.append({
                    'id': documento.id,
                    'titulo': documento.titulo,
                    'status': documento.status,
                    'data_criacao': documento.data_criacao,
                    'projeto': documento.projeto_id,
                    'nome_projeto': documento.projeto.nome,
                    'iteracao': documento.iteracao_id,
                    'nome_iteracao': documento.iteracao.nome,
                    'artefato': documento.artefato_id,
                    'nome_artefato': documento.artefato.nome
                })
                
            if documentos_info: 
                return JsonResponse(documentos_info, safe=False, json_dumps_params={'ensure_ascii': False})
            
            return Response({'error': 'Nenhum documento encontrado para este projeto.'}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarDocumentoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try:
            
            documento = Documento.objects.get(pk=id)
            
            serializer = DocumentoSerializer(documento, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExcluirDocumentosView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            ids_documentos = request.GET.getlist('ids[]', [])

            if not ids_documentos:
                return Response({'error': 'IDs dos documentos a serem excluídos não fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

            documentos = Documento.objects.filter(id__in=ids_documentos)

            if not documentos.exists():
                return JsonResponse({'error': 'Nenhum documento encontrado com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)

            documentos.delete()

            return Response({"detail": "Documentos excluídos com sucesso"}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)