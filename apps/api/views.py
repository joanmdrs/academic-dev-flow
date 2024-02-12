from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from .authentication import TokenService
from django.contrib.auth.models import Group

@authentication_classes([])
@permission_classes([AllowAny])
class LoginView(APIView):
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)

                # Obtém todos os grupos associados ao usuário
                grupos_do_usuario = user.groups.all()

                # Converte os nomes dos grupos em uma lista
                nomes_dos_grupos = [grupo.name for grupo in grupos_do_usuario]

                # Gera o token incluindo informações sobre o usuário e grupos
                token = TokenService.generate_token(user, {'groups': nomes_dos_grupos})

                user_data = {
                    "id": user.id,
                    "username": user.username,
                    "groups": nomes_dos_grupos
                    # outras informações do usuário, se necessário
                }

                return Response(
                    {
                    'user': user_data,
                    'token': token, 
                    'detail': 'Login bem-sucedido.',
                    }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
