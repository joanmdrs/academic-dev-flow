from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Flow
from .serializers import FlowSerializer
from apps.etapa.views import CadastrarEtapaView 

class CadastrarFluxoView(APIView):
    def post(self, request):
        try:
            serializer = FlowSerializer(data=request.data)
            
            if(serializer.is_valid(raise_exception=True)):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarFluxoView(APIView):
    def get(self, request):
        try:
            parametro = request.GET.get('name_flow', None)
               
            if parametro is not None:
                fluxos = Flow.objects.filter(nome__icontains=parametro)
            
            else: 
                fluxos = Flow.objects.all()
                
            serializer = FlowSerializer(fluxos, many=True)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarFluxoPeloIdView(APIView):
    def get(self, request, flow_id):
        try:
            fluxo = get_object_or_404(Flow, pk=flow_id)
            print(fluxo)
            
            serializer = FlowSerializer(fluxo, many=False)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)