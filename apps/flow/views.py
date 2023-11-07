from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Flow
from .serializers import FlowSerializer
from apps.etapa.views import CadastrarEtapaView 

class CadastrarFluxoView(APIView):
    def post(self, request):
        serializer = FlowSerializer(data=request.data)
        
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BuscarFluxoView(APIView):
    def get(self, request):
        parametro = request.GET.get('name_flow', None)
        
        if parametro is not None:
            fluxos = Fluxo.objects.filter(nome_icontains=parametro)
        
        else: 
            
            fluxos = Fluxo.objects.all()
            
        serializer = FluxoSerializer(fluxos, many=True)
        
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})