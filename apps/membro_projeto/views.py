from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import MembroProjeto
from .serializers import MembroProjetoSerializer

class CadastrarMembroProjetoView(APIView):
    def post(self, request):
        try:
            serializer = MembroProjetoSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembroProjetoPeloIdProjetoView(APIView): 
    def get(self, request, idProjeto):
        try: 
            objetos = MembroProjeto.objects.filter(projeto=idProjeto)
            
            if objetos is not None:
                serializer = MembroProjetoSerializer(objetos, many=True)
                return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

            return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarMembroProjetoView(APIView):
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
    def delete(self, request, idProjeto):
        try:
            # Obtenha a lista de IDs a partir dos parâmetros da solicitação
            ids_membros = request.data.get('ids_membros', [])

            # Certifique-se de que a lista de IDs não está vazia
            if not ids_membros:
                return Response({'error': 'A lista de IDs de membros está vazia!'}, status=status.HTTP_400_BAD_REQUEST)

            # Filtra os objetos com base nos IDs do projeto e da lista de membros
            objetos = MembroProjeto.objects.filter(projeto=idProjeto, membro__in=ids_membros)

            if objetos.exists():
                objetos.delete()
                return Response({'message': 'Objetos excluídos com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)