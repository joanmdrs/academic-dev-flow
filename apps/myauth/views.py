from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class LoginView(APIView):
    @authentication_classes([])
    @permission_classes([AllowAny])
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            print(f'Username: {username}, Password: {password}')

            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return Response({'detail': 'Login bem-sucedido.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogoutView(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response({'detail': 'Logout bem-sucedido.'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


