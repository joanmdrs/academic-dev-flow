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
    
    def get(self, request, id): 
        try:
            comentario = ComentarioArtefato.objects.get(pk=id)
            serializer = ComentarioArtefatoSerializer(comentario, many=False)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarComentarioArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try:
            
            comentario = ComentarioArtefato.objects.get(pk=id)
            
            serializer = ComentarioArtefatoSerializer(comentario, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirComentarioArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            comentario = ComentarioArtefato.objects.get(pk=id)
            if comentario is not None:
                comentario.delete()
                return Response({"detail": "Comentário excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarComentariosPorArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            comentarios = ComentarioArtefato.objects.filter(artefato_id=request.GET.get('id_artefato'))
            comentarios_info = []
            
            for comentario in comentarios:
                
                membro_projeto = MembroProjeto.objects.get(id=comentario.autor_id)
                membro = Membro.objects.get(id=membro_projeto.membro_id)            
                comentarios_info.append({
                    'id': comentario.id,
                    'texto': comentario.texto,
                    'data_hora': comentario.data_hora,
                    'comentario_pai': comentario.comentario_pai,
                    'autor': comentario.autor_id,
                    'nome_autor': membro.nome
                })

            return Response(comentarios_info, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class ComentarioTreeView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
#         comentarios = Comentario.objects.filter(tarefa_id=id_documento, comentario_pai__isnull=True)
#         arvore_comentarios = Comentario.construir_arvore(comentarios)
#         return Response(arvore_comentarios)