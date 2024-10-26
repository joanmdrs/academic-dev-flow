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
from apps.etapa.models import Etapa
from apps.membro_projeto.models import MembroProjeto
# from apps.membro_projeto.models import FuncaoMembroProjetoAtual, FuncaoMembroProjeto
# from apps.membro_projeto.serializers import FuncaoMembroProjetoAtualSerializer
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
    
class CadastrarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            serializer = IteracaoSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarIteracoesPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            iteracoes = Iteracao.objects.filter(projeto=id_projeto)
            
            if iteracoes.exists():
                serializer = IteracaoSerializer(iteracoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)         
            
            
            return Response(data=[], status=status.HTTP_200_OK)
                    
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request): 
        try:
            
            id_iteracao = request.GET.get('id_iteracao', None)
            
            if not id_iteracao:
                return Response({'error': 'O ID da iteração não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            
            iteracao = Iteracao.objects.get(id=id_iteracao)
            
            if iteracao:
                serializer = IteracaoSerializer(iteracao, data=request.data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({'error': 'Iteração não encontrada !'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExcluirIteracoesView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            ids_iteracoes = request.data.get('ids_iteracoes', [])

            if not ids_iteracoes:
                return Response(
                    {'error': 'IDs das iterações a serem excluídas não foram fornecidos'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            iteracoes = Iteracao.objects.filter(id__in=ids_iteracoes)

            if iteracoes.exists():
                iteracoes.delete()
                return Response({"detail": "Iterações excluídas com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Iterações não encontradas !'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class BuscarIteracaoPeloId(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_iteracao = request.GET.get('id_iteracao', None)
                
            if not id_iteracao:
                return Response({'error': 'O ID da iteração não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            iteracao = Iteracao.objects.get(id=id_iteracao)
            
            if iteracao:
                serializer = IteracaoSerializer(iteracao, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Iteração não encontrada !'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarIteracoesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            iteracoes = Iteracao.objects.all()
            
            if iteracoes.exists():
                serializer = IteracaoSerializer(iteracoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarIteracoesPeloNomeEPeloProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            nome = request.GET.get('nome_iteracao')
            projeto = request.GET.get('id_projeto')
            
            if not nome and not projeto:
                return Response({'error': 'Pelo menos um parâmetro é necessário'}, status=status.HTTP_400_BAD_REQUEST)
            
            if nome and projeto:
                iteracoes = Iteracao.objects.filter(nome__icontains=nome, projeto_id=projeto)
            elif nome:
                iteracoes = Iteracao.objects.filter(nome__icontains=nome)
            else: 
                iteracoes = Iteracao.objects.filter(projeto_id=projeto)
                
            if iteracoes.exists():
                
                serializer = IteracaoSerializer(iteracoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  