from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Tarefa
from .serializers import TarefaSerializer
from apps.fluxo.models import Fluxo
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 


class CadastrarTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        try:
            serializer = TarefaSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
            
    