from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import MembroProjeto
from .serializers import MembroProjetoSerializer
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.db.models import Count

class CadastrarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            membros_data = request.data.get('membros', [])
            serializer = MembroProjetoSerializer(data=membros_data, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
class BuscarProjetosDoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, idUser):
        try:   
            membro = Membro.objects.get(usuario__id=idUser)
            
            objetos = MembroProjeto.objects.filter(membro=membro)
            
            if objetos is not None:
                serializer = MembroProjetoSerializer(objetos, many=True)
                return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        
            return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembrosPorProjetoView(APIView): 
    permission_classes = [IsAuthenticated]
    
    def get(self, request, idProjeto):
        try: 
            objetos = MembroProjeto.objects.filter(projeto=idProjeto)
            
            if objetos.exists():
                serializer = MembroProjetoSerializer(objetos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(data=[], status=status.HTTP_204_NO_CONTENT)

        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id): 
        try: 
            
            membroProjeto = MembroProjeto.objects.get(id=id) 
            
            serializer = MembroProjetoSerializer(membroProjeto, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
        except Exception as e: 
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class ExcluirMembroProjetoOneView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            membroProjeto = MembroProjeto.objects.get(pk=id)
            
            if membroProjeto is not None: 
                membroProjeto.delete()
                return Response(
                    {'detail': 'Relacionamento entre membro e projeto excluído com sucesso!'}, 
                    status=status.HTTP_204_NO_CONTENT)
            
            else: 
                return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class ExcluirMembroProjetoManyView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, idProjeto):
        try:
            # Obtenha a lista de IDs a partir dos parâmetros da solicitação
            ids_membros = request.data.get('ids_membros', [])

            if not ids_membros:
                return Response({'error': 'A lista de IDs de membros está vazia!'}, status=status.HTTP_400_BAD_REQUEST)

            objetos = MembroProjeto.objects.filter(projeto=idProjeto, membro__in=ids_membros)

            if objetos.exists():
                objetos.delete()
                return Response({'message': 'Objetos excluídos com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class QuantidadeMembrosPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id_projeto):
        try:
            # Utilizando a função aggregate para contar a quantidade de membros por projeto
            quantidade_membros = MembroProjeto.objects.filter(projeto__id=id_projeto).aggregate(quantidade_membros=Count('id'))

            # Verificando se o projeto existe
            if quantidade_membros is not None:
                return Response({'id_projeto': id_projeto, 'quantidade_membros': quantidade_membros['quantidade_membros']}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Projeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarMembrosPorProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto):
        try:
            
            membros_projeto = MembroProjeto.objects.filter(projeto_id=id_projeto)
            membros_info = []
            for membro_projeto in membros_projeto:
                membros_info.append({
                    'id_membro_projeto': membro_projeto.id,
                    'id_projeto': membro_projeto.projeto.id,
                    'id_membro': membro_projeto.membro.id,
                    'nome_membro': membro_projeto.membro.nome,
                    'grupo_membro': membro_projeto.membro.grupo
                })
            
            if not membros_info:
                return Response({'message': 'Nenhum membro encontrado.', 'results': []}, status=status.HTTP_200_OK)
            
            return JsonResponse(membros_info, safe=False, status=status.HTTP_200_OK)
  
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)