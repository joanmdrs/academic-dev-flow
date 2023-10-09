from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Projeto
from .serializers import ProjetoSerializer

class CadastrarProjetoView(APIView):
    def post(self, request):
        serializer = ProjetoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BuscarProjetosPorNomeView(APIView):
    def get(self, request):
        parametro = request.GET.get('name', None)
        print(parametro)

        if parametro is not None:
            projetos = Projeto.objects.filter(nome__icontains=parametro)
        else:
            projetos = Projeto.objects.all()

        serializer = ProjetoSerializer(projetos, many=True)

        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
