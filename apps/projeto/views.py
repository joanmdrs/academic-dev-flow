from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Projeto
from .serializers import ProjetoSerializer
from django.shortcuts import get_object_or_404
from apps.fluxo.models import Fluxo
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from apps.membro_projeto.models import MembroProjeto
from apps.membro_projeto.serializers import MembroProjetoSerializer

    
class CadastrarProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            serializer = ProjetoSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarProjetosPorNomeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            nome_projeto = request.GET.get('nome_projeto', None)

            # Certifique-se de que a variável 'projetos' seja sempre definida
            if not nome_projeto:
                projetos = Projeto.objects.all()
            else:
                projetos = Projeto.objects.filter(nome__icontains=nome_projeto)

            if projetos.exists(): 
                serializer = ProjetoSerializer(projetos, many=True)
                return Response({'message': 'Projetos encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)

            return Response({'message': 'Nenhum projeto encontrado.', 'results': []}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class ListarProjetoPorIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            projeto = Projeto.objects.get(pk=id)
            serializer = ProjetoSerializer(projeto, many=False)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarProjetosPorListaDeIdsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            ids_projetos = request.GET.getlist('ids[]', [])

            projetos = Projeto.objects.filter(id__in=ids_projetos)

            if not projetos:
                return Response({'message': 'Nenhum projeto encontrado.', 'results': []}, status=status.HTTP_200_OK)

            serializer = ProjetoSerializer(projetos, many=True)
            return Response({'message': 'Projetos encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)

        except ValueError:
            return Response({'error': 'IDs fornecidos são inválidos.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  
class ExcluirProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido !'}, status=status.HTTP_400_BAD_REQUEST)
            
            projeto = Projeto.objects.get(id=id_projeto)
            
            if projeto:
                projeto.delete()
                return Response({'message': 'Projeto excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Projeto não localizado !'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AtualizarProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try:
            
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            
            projeto = Projeto.objects.get(id=id_projeto)
            
            if projeto:
                serializer = ProjetoSerializer(projeto, data=request.data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
            return Response({'error': 'Projeto não localizado !'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarFluxoProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try:
            projeto = Projeto.objects.get(pk=id)
            fluxo_id = request.data.get('fluxo_id', None)

            if fluxo_id is not None:
                if fluxo_id == 0:
                    projeto.fluxo = None
                else:
                    fluxo = get_object_or_404(Fluxo, id=fluxo_id)
                    projeto.fluxo = fluxo

                projeto.save()

                serializer = ProjetoSerializer(projeto)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            else:
                return Response({'error': 'O ID do novo fluxo não foi fornecido ou é inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        except Projeto.DoesNotExist:
            return Response({'error': 'Projeto não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarProjetosView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        try:
            projetos = Projeto.objects.all()
            
            if projetos.exists():
                serializer = ProjetoSerializer(projetos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)