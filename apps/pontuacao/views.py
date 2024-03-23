from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Pontuacao
from .serializers import PontuacaoSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarPontuacaoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request): 
        try:
            serializer = PontuacaoSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class BuscarPontuacaoPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id): 
        try:
            pontuacao = Pontuacao.objects.get(pk=id)
            serializer = PontuacaoSerializer(pontuacao, many=False)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarPontuacaoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try:
            
            pontuacao = Pontuacao.objects.get(pk=id)
            
            serializer = PontuacaoSerializer(pontuacao, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirPontuacaoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            pontuacao = Pontuacao.objects.get(pk=id)
            if pontuacao is not None:
                pontuacao.delete()
                return Response({"detail": "Pontuação excluída com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

