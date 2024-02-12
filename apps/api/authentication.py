import jwt
import datetime
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class JSONWebTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Obtenha o token da solicitação
        token = self.get_token(request)

        if token is None:
            return None

        try:
            # Decodifique o token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # Obtenha o usuário associado ao token
            user = get_user_model().objects.get(pk=payload['user_id'])
            
            # Verifique se o usuário está ativo
            if not user.is_active:
                raise AuthenticationFailed('Usuário inativo ou excluído.')

            return (user, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expirado.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Token inválido.')
        except get_user_model().DoesNotExist:
            raise AuthenticationFailed('Usuário associado ao token não encontrado.')

    def get_token(self, request):
        # Obtém o token da solicitação (pode ser de um cabeçalho, cookie, parâmetro de consulta, etc.)
        # Adapte conforme necessário para a sua aplicação
        return request.headers.get('Authorization', '').split(' ')[1]

    def authenticate_header(self, request):
        return 'Bearer'

class TokenService:
    @staticmethod
    def generate_token(user):
        """
        Gera um token JWT para o usuário.
        """
        payload = {
            'username': user.username,
            'group': user.group,
            'iat': datetime.datetime.utcnow(),
            'nbf': datetime.datetime.utcnow() + datetime.timedelta(minutes=-5),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

