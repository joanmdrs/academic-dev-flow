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