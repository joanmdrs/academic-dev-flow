from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Membro
from .serializers import MembroSerializer
from django.shortcuts import get_object_or_404

class CadastrarMembroView(APIView):
    def post(self, request):
        try:
            serializer = MembroSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BuscarMembrosPorNomeView(APIView):
    def get(self, request):
        parametro = request.GET.get('name', None)
        
        if parametro is not None: 
            membros = Membro.objects.filter(nome__icontains=parametro)
            
        else:
            membros = Membro.objects.all()
            
        serializer = MembroSerializer(membros, many=True)
        
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
    
class ExcluirMembroView(APIView):
    def delete(self, request, id):
        membro = get_object_or_404(Membro, id = id)
        
        if membro is not None:
            membro.delete()
            return Response({"detail": "Membro excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT);
    
        else:
            return JsonResponse({'error': 'Recurso não encontrado'}, status=404);
    
class AtualizarMembroView(APIView):
    def patch(self, request, id):
        membro = Membro.objects.get(pk=id)
        serializer = MembroSerializer(membro, data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else: 
            return JsonResponse({'error': 'Dados inválidos'}, status=400)