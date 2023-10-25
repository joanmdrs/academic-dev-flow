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
            CadastrarEtapaView.as_view()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)