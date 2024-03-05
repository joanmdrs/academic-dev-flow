from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Iteracao
from django.shortcuts import get_object_or_404
from .models import Iteracao
from .serializers import IteracaoSerializer
from apps.projeto.models import Projeto
from apps.fluxo_etapa.models import FluxoEtapa
from apps.membro_projeto.models import MembroProjeto
from rest_framework.permissions import IsAuthenticated
    
class CadastrarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            gerente_id = request.data.get('gerente', None)
            
            membro_projeto = MembroProjeto.objects.get(id=gerente_id)

            membro_projeto.funcao = "gerente"
            membro_projeto.save()
            
            serializer = IteracaoSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarIteracaoPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto):
        try:
        
            iteracoes = Iteracao.objects.filter(projeto=id_projeto)
            
            if iteracoes is not None: 
                serializer = IteracaoSerializer(iteracoes, many=True)
                return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
            return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
