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
from rest_framework.decorators import action

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
        
    @action(detail=False, methods=['delete'], url_path='bulk-delete')
    def bulk_delete(self, request):
        ids = request.data.get('ids', [])

        if not ids:
            return Response(
                {'error': 'IDs não fornecidos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        queryset = FluxoEtapa.objects.filter(id__in=ids)

        if not queryset.exists():
            return Response(
                {'error': 'Itens não encontrados'},
                status=status.HTTP_404_NOT_FOUND
            )

        queryset.delete()

        return Response(
            {'detail': 'Itens excluídos com sucesso'},
            status=status.HTTP_204_NO_CONTENT
        )
        
    
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