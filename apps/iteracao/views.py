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
from django.utils.timezone import now


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
                iteracoes = Iteracao.objects.all()
            
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
        
class BuscarIteracoesDosProjetosDoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_membro = request.GET.get('id_membro', None)
            
            if not id_membro:
                return Response({'error': 'O ID do membro não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            membros_projeto = MembroProjeto.objects.filter(membro=id_membro)
            
            if not membros_projeto.exists():
                # Retorna uma resposta específica indicando que o membro não está vinculado a nenhum projeto
                return Response(
                    {
                        'message': 'O membro não está vinculado a nenhum projeto',
                        'code': 'MEMBRO_SEM_PROJETO'
                    }, 
                    status=status.HTTP_200_OK
                )

            # Extrai os projetos do queryset MembroProjeto
            projetos_ids = membros_projeto.values_list('projeto', flat=True)
            
            # Busca todas as iterações vinculadas a esses projetos
            iteracoes = Iteracao.objects.filter(projeto__in=projetos_ids).distinct().order_by('projeto')
            
            if not iteracoes.exists():
                return Response([], status=status.HTTP_200_OK)

            # Serializa as iterações
            serializer = IteracaoSerializer(iteracoes, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Objeto(s) MembroProjeto não localizado(s)'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarUltimaIteracaoDoProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            id_release = request.GET.get('id_release', None)
            
            if not id_projeto or not id_release:
                return Response(
                    {'error': 'IDs do projeto e da release são necessários!'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Busca a última iteração da release específica
            ultima_iteracao = Iteracao.objects.filter(projeto=id_projeto, release=id_release).order_by('-ordem').first()
            
            if ultima_iteracao:
                serializer = IteracaoSerializer(ultima_iteracao)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(
                {
                    'message': 'Este projeto ainda não possui iterações na release selecionada.',
                    'code': 'RELEASE_SEM_ITERACOES'
                }, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarIteracoesAdjacentesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            id_iteracao_atual = request.GET.get('id_iteracao', None)
            
            if not id_projeto or not id_iteracao_atual:
                return Response(
                    {'error': 'ID do projeto e da iteração atual são necessários!'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Busca a iteração atual
            iteracao_atual = Iteracao.objects.filter(projeto=id_projeto, id=id_iteracao_atual).first()
            if not iteracao_atual:
                return Response(
                    {'error': 'A iteração atual não foi encontrada.'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Filtro para considerar apenas iterações da mesma release da iteração atual
            release_atual = iteracao_atual.release

            # Busca a iteração anterior (ordem imediatamente menor na mesma release)
            iteracao_anterior = Iteracao.objects.filter(
                projeto=id_projeto,
                release=release_atual,
                ordem__lt=iteracao_atual.ordem
            ).order_by('-ordem').first()

            # Busca a próxima iteração (ordem imediatamente maior na mesma release)
            iteracao_posterior = Iteracao.objects.filter(
                projeto=id_projeto,
                release=release_atual,
                ordem__gt=iteracao_atual.ordem
            ).order_by('ordem').first()

            # Serializa as iterações encontradas (anterior, atual, posterior)
            data = {
                'iteracao_anterior': IteracaoSerializer(iteracao_anterior).data if iteracao_anterior else None,
                'iteracao_posterior': IteracaoSerializer(iteracao_posterior).data if iteracao_posterior else None,
            }
            
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarIteracaoAtualDoProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            hoje = now().date()
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            iteracao = Iteracao.objects.filter(
                projeto_id=id_projeto,
                data_inicio__lte=hoje,
                data_termino__gte=hoje
            ).first()

            
            if iteracao:
                serializer = IteracaoSerializer(iteracao, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
                
            return Response(
                {   
                    "message": 'Não foi encontrada nenhuma iteração em andamento no momento!',
                    "code": "ITERACAO_NAO_ENCONTRADA"}, status=status.HTTP_204_NO_CONTENT)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
