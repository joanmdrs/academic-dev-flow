from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Fluxo
from .serializers import FluxoSerializer
from apps.etapa.views import CadastrarEtapaView 
from rest_framework.permissions import IsAuthenticated

class CadastrarFluxoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            if not request.data:
                return Response(
                    {'error': 'Os dados do fluxo não foram fornecidos na Request.'}, 
                    status=status.HTTP_400_BAD_REQUEST)
                
            if not request.data['nome']:
                return Response(
                    {'error': 'O campo nome é obrigatório para a criação do fluxo.'},
                    status=status.HTTP_400_BAD_REQUEST)
                
            serializer = FluxoSerializer(data=request.data, context={'request': request})
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarFluxoPeloNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
        
            nome_fluxo = request.GET.get('nome_fluxo', None)
            
            if nome_fluxo:
                fluxos = Fluxo.objects.filter(nome__icontains=nome_fluxo)
            else: 
                fluxos = Fluxo.objects.all()
                
            if not fluxos:
                return Response({'message': 'Nenhum fluxo encontrado', 'results': []}, status=status.HTTP_200_OK)
                
            serializer = FluxoSerializer(fluxos, many=True)
            
            return Response({'message': 'Fluxos encontrados com sucesso!', 'results': serializer.data}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarFluxoPeloIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            id_fluxo = request.GET.get('id_fluxo', None)
            
            if not id_fluxo:
                return Response({'error': 'O ID do fluxo não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
            
            fluxo = Fluxo.objects.get(id=id_fluxo)
            serializer = FluxoSerializer(fluxo, many=False)            
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        
        except Fluxo.DoesNotExist:
            return Response({'error': 'Fluxo não localizado.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AtualizarFluxoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request): 
        try: 
            id_fluxo = request.GET.get('id_fluxo', None)
            
            if not id_fluxo:
                return Response({'error': 'O ID fluxo não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
        
            fluxo = Fluxo.objects.get(id=id_fluxo)
            
            serializer = FluxoSerializer(fluxo, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Fluxo.DoesNotExist:
            return Response({'error': 'Fluxo não localizado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExcluirFluxoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            id_fluxo = request.GET.get('id_fluxo', None)
            
            if not id_fluxo:
                return Response({'error': 'O ID do fluxo não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
            
            fluxo = Fluxo.objects.get(id=id_fluxo)
            
            if fluxo:
                fluxo.delete()
                return Response({'detail': 'Fluxo excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
        except Fluxo.DoesNotExist:
            return Response({'error': 'Fluxo não localizado.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarFluxosView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            fluxos = Fluxo.objects.all()
            
            if fluxos.exists():
                serializer = FluxoSerializer(fluxos, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
