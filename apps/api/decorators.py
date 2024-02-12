from functools import wraps
from django.http import HttpResponseForbidden
from .authentication import JSONWebTokenAuthentication

def jwt_required_and_in_group(group_name):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            # Crie uma instância da sua classe de autenticação JWT para verificar o token
            jwt_authenticator = JSONWebTokenAuthentication()

            # Tente autenticar o usuário com base no token presente na solicitação
            authentican_result = jwt_authenticator.authenticate(request)

            # Se a autenticação for bem-sucedida, o usuário está presente nos resultados
            if authentication_result and authentication_result[0]:
                user, _ = authentication_result

                # Verifique se o usuário pertence ao grupo especificado
                if group_name not in user.groups.values_list('name', flat=True):
                    return HttpResponseForbidden('Usuário não autorizado')
            else:
                return HttpResponseForbidden('Token inválido ou ausente')

            return view_func(request, *args, **kwargs)

        return _wrapped_view

    return decorator

