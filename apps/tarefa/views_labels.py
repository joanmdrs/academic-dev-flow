from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Label
from .serializers import LabelSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.http import Http404
from django.shortcuts import get_object_or_404

class CadastrarLabelView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        
        try:
            labels = request.data.get('labels', [])
            serializer = LabelSerializer(data=labels, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class BuscarLabelPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        try:
            label = get_object_or_404(Label, id_github=id)
            serializer = LabelSerializer(label)
            return Response({'label': serializer.data, 'exists': True}, status=status.HTTP_200_OK)
        
        except Http404:
            return Response({'exists': False}, status=status.HTTP_200_OK)
                                        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 