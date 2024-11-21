from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import ComentarioTarefa
from .serializers import ComentarioTarefaSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarComentarioTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request): 
        try:
            serializer = ComentarioTarefaSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class BuscarComentarioTarefaPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try:
            id_comentario = request.GET.get('id_comentario', None)
            
            if not id_comentario:
                return Response({'error': 'O ID do comentário não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            comentario = ComentarioTarefa.objects.get(id=id_comentario)
            
            if comentario:
                serializer = ComentarioTarefaSerializer(comentario, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Comentário não localizado !'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarComentarioTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request): 
        try:
            id_comentario = request.GET.get('id_comentario', None)
            
            if not id_comentario:
                return Response({'error': 'O ID do comentário não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
                
            comentario = ComentarioTarefa.objects.get(id=id_comentario)
            
            if comentario:
        
                serializer = ComentarioTarefaSerializer(comentario, data=request.data, partial=True)
                
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({'error': 'Comentário não localizado !'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirComentarioTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            id_comentario = request.GET.get('id_comentario', None)
            
            if not id_comentario:
                return Response(
                    {'error': 'O ID do comentário não foi fornecido !'}, 
                    status=status.HTTP_400_BAD_REQUEST)
                
            comentario = ComentarioTarefa.objects.get(id=id_comentario)
            
            if comentario:
                comentario.delete()
                return Response({"detail": "Comentário excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Comentário não localizado !'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarComentariosPorTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_tarefa = request.GET.get('id_tarefa', None)
            
            if not id_tarefa:
                return Response(
                    {'error': 'O ID da tarefa não foi fornecido !'}, 
                    status=status.HTTP_400_BAD_REQUEST)
            
            comentarios = ComentarioTarefa.objects.filter(tarefa=id_tarefa).order_by('data_hora')
            
            if comentarios:
                serializer = ComentarioTarefaSerializer(comentarios, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
                
            return Response([], status=status.HTTP_200_OK)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
