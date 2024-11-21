from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import ComentarioArtefato
from .serializers import ComentarioArtefatoSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarComentarioArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request): 
        try:
            serializer = ComentarioArtefatoSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class BuscarComentarioArtefatoPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try:
            id_comentario = request.GET.get('id_comentario', None)
            
            if not id_comentario:
                return Response({'error': 'O ID do comentário não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST) 
                
            comentario = ComentarioArtefato.objects.get(id=id_comentario)
            
            if comentario:
                serializer = ComentarioArtefatoSerializer(comentario, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Comentário não localizado !'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarComentarioArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request): 
        try:
            id_comentario = request.GET.get('id_comentario', None)
            
            if not id_comentario:
                return Response({'error': 'O ID do comentário não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST) 
            
            comentario = ComentarioArtefato.objects.get(id=id_comentario)
            
            if comentario:
                serializer = ComentarioArtefatoSerializer(comentario, data=request.data, partial=True)
                
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({'error': 'Comentário não localizado !'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirComentarioArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            id_comentario = request.GET.get('id_comentario', None)
            
            if not id_comentario:
                return Response({'error': 'O ID do comentário não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST) 
            
            comentario = ComentarioArtefato.objects.get(id=id_comentario)
            
            if comentario:
                comentario.delete()
                return Response({"detail": "Comentário excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Comentário não localizado !'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarComentariosPorArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_artefato = request.GET.get('id_artefato', None)
            
            if not id_artefato:
                return Response({'error': 'O ID do artefato não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            comentarios = ComentarioArtefato.objects.filter(artefato=id_artefato).order_by('data_hora')
            
            if comentarios:
                serializer = ComentarioArtefatoSerializer(comentarios, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
