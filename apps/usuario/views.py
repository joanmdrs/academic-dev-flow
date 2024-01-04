from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Usuario
from .serializers import UsuarioSerializer
from django.shortcuts import get_object_or_404

class CadastrarUsuarioView(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BuscarUsuarioPorIdView(APIView):
    def get(self, request, id):
        usuario = get_object_or_404(Usuario, id = id)
        
        if usuario is not None: 
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
class BuscarUsuarioPorIdMembroView(APIView):
    def get(self, request, id):
        try: 
            usuario = Usuario.objects.get(membro_id=id)

            if usuario is not None:
                serializer = UsuarioSerializer(usuario)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        
class ExcluirUsuarioView(APIView):
    def delete(self, request, id):
        usuario = get_object_or_404(Usuario, id = id)
        
        if usuario is not None:
            usuario.delete()
            return Response({"detail": "Usuário excluído com sucesso!"}, status=status.HTTP_204_NO_CONTENT);
        
        else:
            return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
class AtualizarUsuarioView(APIView):
    def patch(self, request, id):
        usuario = get_object_or_404(Usuario, id = id)
        
        if usuario is not None:
            serializer = UsuarioSerializer(usuario, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else: 
                return JsonResponse({'error': 'Dados inválidos'}, status=400)
            
        else: 
            return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
            
            