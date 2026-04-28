from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import FluxoEtapa, TransicaoFluxo
from .serializers import FluxoEtapaSerializer, TransicaoFluxoSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class FluxoEtapaViewSet(viewsets.ModelViewSet):
    serializer_class = FluxoEtapaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = FluxoEtapa.objects.all()

        id_fluxo = self.request.query_params.get('id_fluxo')

        if id_fluxo:
            queryset = queryset.filter(fluxo_id=id_fluxo)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    
class TransicaoFluxoViewSet(viewsets.ModelViewSet):
    serializer_class = TransicaoFluxoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = TransicaoFluxo.objects.all()

        id_fluxo = self.request.query_params.get('id_fluxo')

        if id_fluxo:
            queryset = queryset.filter(fluxo_id=id_fluxo)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)