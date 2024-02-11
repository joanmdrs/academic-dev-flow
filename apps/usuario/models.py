from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):

    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username