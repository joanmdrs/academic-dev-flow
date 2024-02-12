from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from .authentication import TokenService

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
                token = TokenService.generate_token(user)
                return Response({'token': token, 'detail': 'Login bem-sucedido.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
