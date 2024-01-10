from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Projeto
from .serializers import ProjetoSerializer
from django.shortcuts import get_object_or_404

class CadastrarProjetoView(APIView):
    def post(self, request):
        try:
            serializer = ProjetoSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarProjetosPorNomeView(APIView):
    def get(self, request):
        try:
            parametro = request.GET.get('name', None)
            print(parametro)

            if parametro is not None:
                projetos = Projeto.objects.filter(nome__icontains=parametro)
            else:
                projetos = Projeto.objects.all()

            serializer = ProjetoSerializer(projetos, many=True)

            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ExcluirProjetoView(APIView):
    def delete(self, request, id):
        try:
            projeto = get_object_or_404(Projeto, id=id)
            if projeto is not None:
                projeto.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AtualizarProjetoView(APIView):
    def patch(self, request, id):
        try:
            projeto = Projeto.objects.get(pk=id)
            serializer = ProjetoSerializer(projeto, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'Dados inválidos'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)