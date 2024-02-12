from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .serializers import UsuarioSerializer
from .models import Usuario
from django.contrib.auth.models import Group

class CadastrarUsuarioView(APIView):
    def post(self, request):
        try:
            grupo_nome = request.data.get('grupo', None)
            
            usuario_serializer = UsuarioSerializer(data=request.data)

            if usuario_serializer.is_valid(raise_exception=True):
                usuario = usuario_serializer.save()

                if grupo_nome:
                    grupo = Group.objects.get(name=grupo_nome)
                    usuario.groups.add(grupo)

                return Response(usuario_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'error': 'Erro ao cadastrar usuário'}, status=status.HTTP_400_BAD_REQUEST)

    
class BuscarUsuarioPorIdView(APIView):
    def get(self, request, id):
        try:
            usuario = get_object_or_404(Usuario, id=id)
            
            if usuario is not None: 
                serializer = UsuarioSerializer(usuario)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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
        try:
            usuario = get_object_or_404(Usuario, id=id)
            
            if usuario is not None:
                usuario.delete()
                return Response({"detail": "Usuário excluído com sucesso!"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
class AtualizarUsuarioView(APIView):
    def patch(self, request, id):
        try:
            usuario = Usuario.objects.get(membro_id=id)
            
            if usuario is not None:
                serializer = UsuarioSerializer(usuario, data=request.data)
                
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else: 
                    return JsonResponse({'error': 'Dados inválidos'}, status=400)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)


