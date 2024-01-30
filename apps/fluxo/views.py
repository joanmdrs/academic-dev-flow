from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Fluxo
from .serializers import FluxoSerializer
from apps.etapa.views import CadastrarEtapaView 

class CadastrarFluxoView(APIView):
    def post(self, request):
        try:
            serializer = FluxoSerializer(data=request.data)
            
            if(serializer.is_valid(raise_exception=True)):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarFluxoView(APIView):
    def get(self, request):
        try:
            parametro = request.GET.get('name_fluxo', None)
               
            if parametro is not None:
                fluxos = Fluxo.objects.filter(nome__icontains=parametro)
            
            else: 
                fluxos = Fluxo.objects.all()
                
            serializer = FluxoSerializer(fluxos, many=True)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarFluxoPeloIdView(APIView):
    def get(self, request, fluxo_id):
        try:
            fluxo = Fluxo.objects.get(pk=fluxo_id)
            
            serializer = FluxoSerializer(fluxo, many=False)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       
class AtualizarFluxoView(APIView):
    def patch(self, request, fluxo_id): 
        try: 
            
            fluxo = Fluxo.objects.get(pk=fluxo_id) 
            
            serializer = FluxoSerializer(fluxo, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
        except Exception as e: 
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExcluirFluxoView(APIView):
    def delete(self, request, fluxo_id):
        
        try: 
            
            fluxo = Fluxo.objects.get(pk=fluxo_id)
            
            if fluxo is not None: 
                fluxo.delete()
                return Response({'detail': 'Fluxo excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
            else: 
                return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
    
    
class ListarFluxosView(APIView):
    def get(self, request):
        try:
            fluxos = Fluxo.objects.all()
            
            serializer = FluxoSerializer(fluxos, many=True) 
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})   
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            