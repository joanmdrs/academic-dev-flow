from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Comentario
from .serializers import ComentarioSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarComentarioView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request): 
        try:
            serializer = ComentarioSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class BuscarComentarioPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id): 
        try:
            comentario = Comentario.objects.get(pk=id)
            serializer = ComentarioSerializer(comentario, many=False)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarComentarioView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try:
            
            comentario = Comentario.objects.get(pk=id)
            
            serializer = ComentarioSerializer(comentario, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirComentarioView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            comentario = Comentario.objects.get(pk=id)
            if comentario is not None:
                comentario.delete()
                return Response({"detail": "Comentário excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarComentariosPorArtefatoView(APIView):
    def get(self, request, id_artefato):
        comentarios = Comentario.objects.filter(documento_id=id_artefato)
        serializer = ComentarioSerializer(comentarios, many=True)
        return Response(serializer.data)

class ComentarioTreeView(APIView):
    def get(self, request, id_artefato):
        comentarios = Comentario.objects.filter(documento_id=id_artefato, comentario_pai__isnull=True)
        arvore_comentarios = Comentario.construir_arvore(comentarios)
        return Response(arvore_comentarios)