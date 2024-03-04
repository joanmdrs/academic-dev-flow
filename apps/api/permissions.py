from rest_framework.permissions import BasePermission

class IsAdminUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Verifica se o usuário autenticado é um administrador ou pertence a um grupo específico
        return (
            request.user and 
            request.user.is_authenticated and 
            (request.user.is_staff and request.user.groups.filter(name='Administradores').exists())
        )