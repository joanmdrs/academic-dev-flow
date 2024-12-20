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
            serializer = FluxoEtapaSerializer(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarFluxoEtapaPorFluxoView(APIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try: 
            id_fluxo = request.GET.get('id_fluxo', None)
            fluxo_etapas = FluxoEtapa.objects.filter(fluxo=id_fluxo)
            
            if fluxo_etapas:
                serializer = FluxoEtapaSerializer(fluxo_etapas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
            
            
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
            ids_fluxo_etapas = request.data.get('ids_fluxo_etapas', [])

            if not ids_fluxo_etapas:
                return Response({'error': 'O IDs das tarefas não foram fornecidos'}, status=status.HTTP_400_BAD_REQUEST)
                
            fluxo_etapas = FluxoEtapa.objects.filter(id__in=ids_fluxo_etapas)
            
            if fluxo_etapas.exists():
                fluxo_etapas.delete()
                return Response({"detail": "Etapas desvinculadas do fluxo com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Uma ou mais etapas não foram encontradas'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ListarFluxoEtapasView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            fluxo_etapas = FluxoEtapa.objects.all()
            
            if fluxo_etapas:
                serializer = FluxoEtapaSerializer(fluxo_etapas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)