from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import CategoriaTarefa
from .serializers import CategoriaTarefaSerializer
from rest_framework.permissions import IsAuthenticated

class CadastrarCategoriaTarefaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request): 
        try:
            serializer = CategoriaTarefaSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class AtualizarCategoriaTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        try:
            id_categoria_tarefa = request.GET.get('id_categoria_tarefa', None)
            
            if not id_categoria_tarefa:
                return Response({'error': 'O ID da categoria tarefa não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            categoria_tarefa = CategoriaTarefa.objects.get(id=id_categoria_tarefa)
            serializer = CategoriaTarefaSerializer(categoria_tarefa, data=request.data, partial=True) 
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except CategoriaTarefa.DoesNotExist:
            return Response({'error': 'Objeto CategoriaTarefa não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class BuscarCategoriaTarefaPeloNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        try:
            nome_categoria_tarefa = request.GET.get('nome_categoria_tarefa', None)
            
            if nome_categoria_tarefa: 
                objs_categoria_tarefa = CategoriaTarefa.objects.filter(nome__icontains=nome_categoria_tarefa)
                
            else:
                objs_categoria_tarefa = CategoriaTarefa.objects.all()
                
            if not objs_categoria_tarefa.exists(): 
                return Response([], status=status.HTTP_204_NO_CONTENT)
            
            serializer = CategoriaTarefaSerializer(objs_categoria_tarefa, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarCategoriaTarefaPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try:
            id_categoria_tarefa = request.GET.get('id_categoria_tarefa', None)
            
            if not id_categoria_tarefa:
                return Response({'error': 'O ID da categoria tarefa não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)

            obj_categoria_tarefa = CategoriaTarefa.objects.get(id=id_categoria_tarefa)
            
            if obj_categoria_tarefa:
                serializer = CategoriaTarefaSerializer(obj_categoria_tarefa, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({'error': 'Objeto não encontrado !'}, status=status.HTTP_404_NOT_FOUND) 
        
        except CategoriaTarefa.DoesNotExist:
            return Response({'error': 'Objeto CategoriaTarefa não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
class ListarCategoriaTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            objs_categoria_tarefa = CategoriaTarefa.objects.all()
            
            if objs_categoria_tarefa.exists(): 
                serializer = CategoriaTarefaSerializer(objs_categoria_tarefa, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
           
class ExcluirCategoriaTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            ids_categoria_tarefa = request.data.get('ids_categoria_tarefa', [])
            
            if not ids_categoria_tarefa:
                return Response({'error': 'Os Ids das categorias tarefa não foram fornecidos!'}, status=status.HTTP_400_BAD_REQUEST)

            objs_categoria_tarefa = CategoriaTarefa.objects.filter(id__in=ids_categoria_tarefa)

            if not objs_categoria_tarefa.exists():
                return Response({'error': 'Nenhum objeto encontrado com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)

            objs_categoria_tarefa.delete()

            return Response({'message': 'Objetos excluídos com sucesso'}, status=status.HTTP_204_NO_CONTENT)
        
        except CategoriaTarefa.DoesNotExist:
            return Response({'error': 'Objeto CategoriaTarefa não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
