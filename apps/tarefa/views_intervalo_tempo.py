from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tarefa, IntervaloTempo
from .serializers import TarefaSerializer, IntervaloTempoSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.iteracao.models import Iteracao
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.shortcuts import get_object_or_404

class IniciarContagemTempoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            id_membro_projeto = request.data.get('id_membro_projeto')
            id_tarefa = request.data.get('id_tarefa')
            
            if not id_membro_projeto or not id_tarefa:
                return Response(
                    {'error': 'O ID da Tarefa ou o ID do MembroProjeto não foram fornecidos'}, 
                    status=status.HTTP_400_BAD_REQUEST)
                
            membro_projeto = get_object_or_404(MembroProjeto, id=id_membro_projeto)
            tarefa = get_object_or_404(Tarefa, id=id_tarefa)
            
            if tarefa and membro_projeto:
                
                intervalo = tarefa.iniciar_contagem_tempo(membro_projeto=membro_projeto)

                if intervalo:
                    serializer = IntervaloTempoSerializer(intervalo, many=False)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({'error': 'Não foi possível iniciar a contagem de tempo.'}, status=status.HTTP_400_BAD_REQUEST)

        except MembroProjeto.DoesNotExist():
            return Response({'error': 'MembroProjeto não localizado'}, status=status.HTTP_404_NOT_FOUND)
        except Tarefa.DoesNotExist():
            return Response({'error': 'Tarefa não localizada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PararContagemTempoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            id_membro_projeto = request.data.get('id_membro_projeto')
            id_tarefa = request.data.get('id_tarefa')
            
            if not id_membro_projeto or not id_tarefa:
                return Response(
                    {'error': 'O ID da Tarefa ou o ID do MembroProjeto não foram fornecidos'}, 
                    status=status.HTTP_400_BAD_REQUEST)
                
            membro_projeto = get_object_or_404(MembroProjeto, id=id_membro_projeto)
            tarefa = get_object_or_404(Tarefa, id=id_tarefa)
            
            if tarefa and membro_projeto:
                intervalo = tarefa.parar_contagem_tempo(membro_projeto=membro_projeto)
                if intervalo:
                    serializer = IntervaloTempoSerializer(intervalo, many=False)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({'error': 'Não foi possível parar a contagem de tempo.'}, status=status.HTTP_400_BAD_REQUEST)
            
        except MembroProjeto.DoesNotExist():
            return Response({'error': 'MembroProjeto não localizado'}, status=status.HTTP_404_NOT_FOUND)
        except Tarefa.DoesNotExist():
            return Response({'error': 'Tarefa não localizada'}, status=status.HTTP_404_NOT_FOUND)       
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)