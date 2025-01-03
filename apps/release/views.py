from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404
from .models import Release
from .serializers import ReleaseSerializer
from apps.projeto.models import Projeto
from apps.fluxo_etapa.models import FluxoEtapa
from apps.etapa.models import Etapa
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated

class CadastrarReleaseView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            
            serializer = ReleaseSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarReleaseView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try:
            id_release = request.GET.get('id_release', None)
            
            if not id_release:
                return Response({'error': 'O ID da release não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            release = Release.objects.get(id=id_release)
            
            if release:
                serializer = ReleaseSerializer(release, data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error': 'Tarefa não localizada !'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarReleasePeloIDView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_release = request.GET.get('id_release', None)
            
            if not id_release:
                return Response({'error': 'O ID da release não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            release = Release.objects.get(id=id_release)
            
            if release:
                serializer = ReleaseSerializer(release, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Release não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarReleasesPeloNomeEPeloProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            nome_release = request.GET.get('nome_release')
            id_projeto = request.GET.get('id_projeto')
            
            if not nome_release and not id_projeto:
                return Response(
                    {'error': 'Os parâmetros nome da release e ID do projeto não foram fornecidos, é necessário pelo menos um parâmetro'}, status=status.HTTP_400_BAD_REQUEST)
            
            if nome_release and id_projeto:
                releases = Release.objects.filter(nome__icontains=nome_release, projeto_id=id_projeto)
            elif nome_release:
                releases = Release.objects.filter(nome__icontains=nome_release)
            else: 
                releases = Release.objects.filter(projeto_id=id_projeto)
                
            if releases.exists():
                
                serializer = ReleaseSerializer(releases, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        
class ListarReleasesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            releases = Release.objects.all()
            
            if releases.exists():
                serializer = ReleaseSerializer(releases, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ListarReleasesPorProjetoView(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request): 
        try:
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
            
            releases = Release.objects.filter(projeto_id=id_projeto).order_by('id')
            
            if releases.exists():
                
                serializer = ReleaseSerializer(releases, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarReleasesDosProjetosDoMembroView(APIView):
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
            
            # Busca todas as releases vinculadas a esses projetos
            releases = Release.objects.filter(projeto__in=projetos_ids).distinct().order_by('projeto')
            
            if not releases.exists():
                return Response([], status=status.HTTP_200_OK)

            # Serializa as releases
            serializer = ReleaseSerializer(releases, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Objeto(s) MembroProjeto não localizado(s)'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirReleasesView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            ids_releases = request.data.get('ids_releases', [])

            if not ids_releases:
                return Response({'error': 'O IDs das releases não foram fornecidos'}, status=status.HTTP_400_BAD_REQUEST)
                
            releases = Release.objects.filter(id__in=ids_releases)
            
            if releases.exists():
                releases.delete()
                return Response({"detail": "Releases excluídas com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Uma ou mais releases não foram encontradas'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarUltimaReleaseDoProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response(
                    {'error': 'O ID do projeto não foi fornecido!'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Obter a última release do projeto
            ultima_release = Release.objects.filter(projeto=id_projeto).order_by('-data_lancamento').first()
            
            if ultima_release:
                serializer = ReleaseSerializer(ultima_release)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            # Resposta quando não há releases no projeto
            return Response(
                {
                    'message': 'Este projeto ainda não possui releases.',
                    'code': 'PROJETO_SEM_RELEASES'
                }, 
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response({'error': str(e), 'code': 'ERRO_INTERNO'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class BuscarReleasesAdjacentesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto')
            release_atual_id = request.GET.get('id_release')
            
            if not id_projeto or not release_atual_id:
                return Response(
                    {'error': 'ID do projeto e da release atual são necessários!'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Release anterior
            release_anterior = Release.objects.filter(
                projeto_id=id_projeto, id__lt=release_atual_id
            ).order_by('-data_lancamento').first()
            
            # Release posterior
            release_posterior = Release.objects.filter(
                projeto_id=id_projeto, id__gt=release_atual_id
            ).order_by('data_lancamento').first()

            data = {
                'release_anterior': ReleaseSerializer(release_anterior).data if release_anterior else None,
                'release_posterior': ReleaseSerializer(release_posterior).data if release_posterior else None
            }
            return Response(data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
