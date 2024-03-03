from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .serializers import UsuarioSerializer
from .models import Usuario
from django.contrib.auth.models import Group
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class BaseUsuarioView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def handle_exception(self, exc):
        return Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CadastrarUsuarioView(BaseUsuarioView):
    def post(self, request, *args, **kwargs):
        try:
            grupo_nome = request.data.get('grupo', None)
            
            usuario_serializer = UsuarioSerializer(data=request.data)

            if usuario_serializer.is_valid(raise_exception=True):
                usuario_data = usuario_serializer.validated_data
                user_created = Usuario.objects.create_user(
                    username=usuario_data['username'],
                    password=usuario_data['password'],
                )

                user_created.is_staff = True
                user_created.is_superuser = False
                user_created.save()

                if grupo_nome:
                    grupo = Group.objects.get(name=grupo_nome)
                    user_created.groups.add(grupo)

                # Use o serializador para converter o objeto Usuario em um formato serializado
                response_serializer = UsuarioSerializer(user_created)

                # Retorne a resposta com os dados serializados
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Adicione logs ou imprima mensagens de erro
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
class BuscarUsuarioPorIdView(BaseUsuarioView):
    def get(self, request, id):
        try:
            usuario = get_object_or_404(Usuario, id=id)
            
            if usuario is not None: 
                serializer = UsuarioSerializer(usuario)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
                
class ExcluirUsuarioView(BaseUsuarioView):
    def delete(self, request, id):
        try:
            usuario = get_object_or_404(Usuario, id=id)
            
            if usuario is not None:
                usuario.delete()
                return Response({"detail": "Usuário excluído com sucesso!"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
class AtualizarUsuarioView(BaseUsuarioView):
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


