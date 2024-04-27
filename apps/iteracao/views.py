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
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
    
class CadastrarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
        
            gerente_id = request.data.get('gerente', None)
            print(gerente_id)
            membro_projeto = MembroProjeto.objects.get(id=gerente_id)


            if membro_projeto is not None: 
                
                membro_projeto.funcao = "gerente"
                membro_projeto.save()
            
                serializer = IteracaoSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarIteracoesPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto):
        try:
            iteracoes = Iteracao.objects.filter(projeto=id_projeto)
            iteracoes_info = []
            
            if iteracoes is not None:
            
                for iteracao in iteracoes:

                    lider = MembroProjeto.objects.get(id=iteracao.lider_id)
                    membro = Membro.objects.get(id=lider.membro_id)
                    fase = FluxoEtapa.objects.get(id=iteracao.fase_id)
                    etapa = Etapa.objects.get(id=fase.etapa_id)
                    
                    iteracoes_info.append({
                        'id': iteracao.id,
                        'nome': iteracao.nome,
                        'numero': iteracao.numero,
                        'data_inicio': iteracao.data_inicio,
                        'data_fim': iteracao.data_fim,
                        'status': iteracao.status,
                        'projeto': iteracao.projeto_id,
                        'lider': lider.id,
                        'id_membro': membro.id,
                        'nome_membro': membro.nome,
                        'fase': fase.id,
                        'id_etapa': etapa.id,
                        'nome_etapa': etapa.nome,
                    })
                    
                return Response(data=iteracoes_info, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
                    
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try:
            
            iteracao = Iteracao.objects.get(pk=id)
            
            serializer = IteracaoSerializer(iteracao, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirIteracaoView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            ids_iteracoes = request.GET.getlist('ids[]', [])

            if not ids_iteracoes:
                return Response({'error': 'IDs das iterações a serem excluídas não fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

            iteracoes = Iteracao.objects.filter(id__in=ids_iteracoes)

            if not iteracoes.exists():
                return JsonResponse({'error': 'Nenhuma iteração encontrada com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)

            iteracoes.delete()

            return Response({"detail": "Iterações excluídas com sucesso"}, status=status.HTTP_204_NO_CONTENT)

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
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)