from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Etapa
from apps.fluxo.models import Fluxo
from .serializers import EtapaSerializer
from rest_framework.permissions import IsAuthenticated

class CadastrarEtapaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            if not request.data:
                return Response(
                    {'error': 'Os dados da etapa não foram fornecidos na Request.'}, status=status.HTTP_400_BAD_REQUEST)
                
            if not request.data['nome']:
                return Response(
                    {'error': 'O campo nome é obrigatório para a criação da etapa.'}, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = EtapaSerializer(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarEtapaPeloNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            nome_etapa = request.GET.get('nome_etapa', None)
            
            if nome_etapa: 
                etapas = Etapa.objects.filter(nome__icontains=nome_etapa)
            else:
                etapas = Etapa.objects.all()    
                
            if not etapas : 
                return Response([], status=status.HTTP_200_OK)
            
            serializer = EtapaSerializer(etapas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
                        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarEtapaPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_etapa = request.GET.get('id_etapa', None)
            
            if not id_etapa:
                return Response({'error': 'O ID da etapa não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
            
            etapa = Etapa.objects.get(id=id_etapa)
            
            if etapa:
                serializer = EtapaSerializer(etapa, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Etapa.DoesNotExist:
            return Response({'error': 'Etapa não localizada.'}, status=status.HTTP_404_NOT_FOUND)
 
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarEtapasView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try: 
            etapas = Etapa.objects.all()
            
            if etapas: 
                serializer = EtapaSerializer(etapas, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class AtualizarEtapaView(APIView): 
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try: 
            id_etapa = request.GET.get('id_etapa', None)
            
            if not id_etapa:
                return Response({'error': 'O ID da etapa não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
            
            etapa = Etapa.objects.get(id=id_etapa)
            
            if etapa:
                serializer = EtapaSerializer(etapa, data=request.data)
                
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
        except Etapa.DoesNotExist:
            return Response({'error': 'Etapa não localizada.'}, status=status.HTTP_404_NOT_FOUND)  
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ExcluirEtapasView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request): 
        try:
            ids_etapas = request.data.get('ids_etapas', [])
                        
            if not ids_etapas:
                return Response({'error': 'O IDs das etapas não foram fornecidos.'}, status=status.HTTP_400_BAD_REQUEST)

            etapas = Etapa.objects.filter(id__in=ids_etapas)
            
            if etapas.exists():
                etapas.delete()
                return Response({'message': 'Etapas excluídas com sucesso !'}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Uma ou mais etapas não foram localizadas.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 