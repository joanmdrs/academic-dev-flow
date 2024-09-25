from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Categoria
from .serializers import CategoriaSerializer
from rest_framework.permissions import IsAuthenticated

class CadastrarTipoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request): 
        try:
            serializer = CategoriaSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class BuscarTipoPeloNomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request): 
        try:
            nome = request.GET.get('nome')
            
            if nome: 
                tipos = Categoria.objects.filter(nome__icontains=nome)
                
            else:
                tipos = Categoria.objects.all()
                
            if not tipos.exists(): 
                return Response([], status=status.HTTP_204_NO_CONTENT)
            
            serializer = CategoriaSerializer(tipos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarTipoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id):
        try:
            tipo = Categoria.objects.get(pk=id)
            serializer = CategoriaSerializer(tipo, data=request.data, partial=True)  # Alterado para permitir atualizações parciais
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Categoria.DoesNotExist:
            return Response({'error': 'Tipo não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirTipoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, id):
        try:
            tipo = Categoria.objects.get(pk=id)
            tipo.delete()
            return Response({'success': 'Tipo excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
        
        except Categoria.DoesNotExist:
            return Response({'error': 'Tipo não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarTiposViews(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            tipos = Tipo.objects.all()
            
            if tipos.exists(): 
                serializer = CategoriaSerializer(tipos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
