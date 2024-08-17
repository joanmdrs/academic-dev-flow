from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import FluxoEtapa
from .serializers import FluxoEtapaSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarFluxoEtapaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            etapas_data = request.data.get('etapas', [])
            serializer = FluxoEtapaSerializer(data=etapas_data, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarFluxoEtapaPeloIdFluxoView(APIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request, idFluxo):
        try: 
            objetos = FluxoEtapa.objects.filter(fluxo=idFluxo)
            
            if objetos is not None:
                serializer = FluxoEtapaSerializer(objetos, many=True)
                return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

            return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarEtapaFluxoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id): 
        try: 
            
            fluxoEtapa = FluxoEtapa.objects.get(id=id) 
            
            serializer = FluxoEtapaSerializer(fluxoEtapa, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
        except Exception as e: 
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class ExcluirEtapaFluxoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            id_fluxo = request.GET.get('id_fluxo', None)
            ids_etapas = request.GET.getlist('ids_etapas[]', [])
                        
            if not ids_etapas or not id_fluxo:
                return Response({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)

            fluxo_etapas = FluxoEtapa.objects.filter(fluxo=id_fluxo, etapa__in=ids_etapas)
            
            if fluxo_etapas.exists():
                fluxo_etapas.delete()
                return Response({'message': 'O vínvulo entre as etapas e o fluxo foi excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)