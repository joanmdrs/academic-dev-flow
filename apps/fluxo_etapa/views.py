from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import FluxoEtapa
from .serializers import FluxoEtapaSerializer

class CadastrarFluxoEtapaView(APIView):
    def post(self, request):
        try:
            serializer = FluxoEtapaSerializer(data=request.data, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirFluxoEtapaView(APIView):
    def delete(self, request, id): 
        try:
            fluxo_etapa = FluxoEtapa.objects.get(pk=id)
            
            if fluxo_etapa is not None:
                fluxo_etapa.delete()
                return Response({'detail': 'Vínculo entre fluxo e etapa removido com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
            else: 
                return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
