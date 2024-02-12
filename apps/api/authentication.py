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
    def generate_token(user, additional_data=None):
        payload = {
            'user_id': user.id,
            'username': user.username,
            'exp': datetime.utcnow() + timedelta(days=1),  # Define a expiração para 1 dia
        }

        # Adiciona informações adicionais (grupos, por exemplo)
        if additional_data:
            payload.update(additional_data)

        token = jwt.encode(payload, 'your_secret_key', algorithm='HS256').decode('utf-8')

        return token

