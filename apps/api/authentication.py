import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class JSONWebTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Obtenha o token da solicitação
        token = self.get_token(request)

        if not token:
            return None

        try:
            # Decodifique o token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # Obtenha o usuário associado ao token
            user = get_user_model().objects.get(pk=payload.get('user_id'))
            
            # Verifique se o usuário está ativo
            if not user.is_active:
                raise AuthenticationFailed('Usuário inativo ou excluído.')

            return user, None

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token de acesso expirado. Realize o login novamente.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('O Token fornecido é inválido.')
        except get_user_model().DoesNotExist:
            raise AuthenticationFailed('Usuário associado ao token não encontrado.')

    def get_token(self, request):
        auth_header = request.headers.get('Authorization', '')
        token_parts = auth_header.split(" ")

        if len(token_parts) == 2:
            return token_parts[1]
        
        # print('Token não encontrado ou malformatado')
        return None

    def authenticate_header(self, request):
        return 'Bearer'


class TokenService:
    @staticmethod
    def generate_token(user, additional_data=None):
        payload = {
            'user_id': getattr(user, 'id', None),
            'username': getattr(user, 'username', None),
            'exp': datetime.utcnow() + timedelta(days=1),
        }

        # Adiciona informações adicionais (grupos, por exemplo)
        if additional_data:
            payload.update(additional_data)

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return token
