from rest_framework.permissions import BasePermission

class IsAdminUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Verifica se o usuário autenticado é um administrador
        return request.user and request.user.is_authenticated and request.user.is_staff
