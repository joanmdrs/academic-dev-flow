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



class BuscarLabelPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        try:
            label = get_object_or_404(Label, id=id)
            serializer = LabelSerializer(label)
            return Response({'label': serializer.data, 'exists': True}, status=status.HTTP_200_OK)
        
        except Http404:
            return Response({'exists': False}, status=status.HTTP_200_OK)
                                        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 