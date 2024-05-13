from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Fluxo
from .serializers import FluxoSerializer
from apps.etapa.views import CadastrarEtapaView 
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class BaseFluxoView(APIView):
    permission_classes = [IsAuthenticated]

    def handle_exception(self, exc):
        return Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CadastrarFluxoView(BaseFluxoView):
    def post(self, request):
        serializer = FluxoSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BuscarFluxoPeloNomeView(BaseFluxoView):
    def get(self, request):
        parametro = request.GET.get('name_fluxo', None)
        
        if parametro is not None:
            fluxos = Fluxo.objects.filter(nome__icontains=parametro)
        else: 
            fluxos = Fluxo.objects.all()
            
        if not fluxos:
            return Response({'message': 'Nenhum fluxo encontrado', 'results': []}, status=status.HTTP_200_OK)
            
        serializer = FluxoSerializer(fluxos, many=True)
        return Response({'message': 'Fluxos encontrados com sucesso!', 'results': serializer.data}, status=status.HTTP_200_OK)

class BuscarFluxoPeloIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, fluxo_id):
        fluxo = get_object_or_404(Fluxo, pk=fluxo_id)
        serializer = FluxoSerializer(fluxo, many=False)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

class AtualizarFluxoView(BaseFluxoView):
    def patch(self, request, fluxo_id): 
        fluxo = get_object_or_404(Fluxo, pk=fluxo_id)
        serializer = FluxoSerializer(fluxo, data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExcluirFluxoView(BaseFluxoView):
    def delete(self, request, fluxo_id):
        fluxo = get_object_or_404(Fluxo, pk=fluxo_id)
        
        if fluxo is not None: 
            fluxo.delete()
            return Response({'detail': 'Fluxo excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
        else: 
            return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

class ListarFluxosView(BaseFluxoView):
    def get(self, request):
        fluxos = Fluxo.objects.all()
        serializer = FluxoSerializer(fluxos, many=True) 
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
