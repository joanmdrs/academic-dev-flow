from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from apps.membro_projeto.models import MembroProjeto
from apps.membro_projeto.serializers import MembroProjetoSerializer
from apps.membro.models import Membro
from apps.projeto.models import Projeto
from .models import CategoriaFuncaoMembro
from .serializers import CategoriaFuncaoMembroSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.core.exceptions import ObjectDoesNotExist

class CadastrarCategoriaFuncaoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            categoria_funcao_membro = request.data.get('categoria_funcao_membro', None)
            
            serializer = CategoriaFuncaoMembroSerializer(data=categoria_funcao_membro, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarCategoriaFuncaoMembroView(APIView): 
    permission_classes = [IsAuthenticated]
    def patch(self, request): 
        try:
            id_categoria = request.GET.get('id_categoria', None)
            data_categoria = request.data.get('data_categoria', None)
            
            if id_categoria is None: 
                return Response({'error': 'ID da categoria não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            if data_categoria is None: 
                return Response({'error': 'Os dados atualizados da categoria não foram fornecidos'}, status=status.HTTP_400_BAD_REQUEST)
            
            obj_categoria = CategoriaFuncaoMembro.objects.get(id=id_categoria)
            
            categoria_serializer = CategoriaFuncaoMembroSerializer(obj_categoria, data=data_categoria, partial=True)
            
            if not categoria_serializer.is_valid(): 
                return Response({'error': 'Dados da categoria são inválidos!'}, status=status.HTTP_400_BAD_REQUEST)
            
            categoria_serializer.save()
            
            return Response(categoria_serializer.data, status=status.HTTP_200_OK)
        
        except CategoriaFuncaoMembro.DoesNotExist:
            return Response({'error': 'Objeto CategoriaFuncaoMembro não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)