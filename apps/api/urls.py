from django.urls import path
from .views import LoginView
from .views import AlterarSenhaView
app_name = 'api'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path("change-password/", AlterarSenhaView.as_view(), name='change-password'),
    ##path('logout/', LogoutView.as_view(), name='logout'),
]