import os


from pathlib import Path
from rest_framework.permissions import AllowAny
from decouple import Csv, config
from django.utils import timezone

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ug($fm-0lbb+48r4y=q63#byfced4uzi_jjax3_g$3g@62)uji'
GITHUB_TOKEN = config('GITHUB_TOKEN')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'labens.dct.ufrn.br']
DOMAINS_WHITELIST = ALLOWED_HOSTS

CSRF_COOKIE_SECURE=config('CSRF_COOKIE_SECURE', default=False, cast=bool)
CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())
CSRF_TRUSTED_ORIGINS = config('CSRF_TRUSTED_ORIGINS', cast=Csv())

SESSION_COOKIE_AGE = 60 * 60 # 1 hora
SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=False, cast=bool)
SESSION_EXPIRE_AT_BROWSER_CLOSE = config('SESSION_EXPIRE_AT_BROWSER_CLOSE', default=True, cast=bool)

SECURE_CONTENT_TYPE_NOSNIFF = config('SECURE_CONTENT_TYPE_NOSNIFF', default=True, cast=bool)
SECURE_BROWSER_XSS_FILTER = config('SECURE_BROWSER_XSS_FILTER', default=False, cast=bool)

# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'apps.projeto',
    'apps.fluxo',
    'apps.etapa',
    'apps.fluxo_etapa',
    'apps.artefato',
    'apps.usuario',
    'apps.membro', 
    'apps.membro_projeto',
    'apps.iteracao',
    'apps.tarefa',
    'apps.tipo',
    'apps.comentario',
    'apps.pontuacao',
    'apps.api',
    'apps.github_integration',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',

]

# CORS_ALLOWED_ORIGINS = [
#    "http://localhost:3000", 
#    "http://labens.dct.ufrn.br",
#]

AUTH_USER_MODEL = 'usuario.Usuario'


APPEND_SLASH = False


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'apps.api.authentication.JSONWebTokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'apps.api.permissions.IsAdminUserOrReadOnly',  
    ],

}

ROOT_URLCONF = 'academic_dev_flow.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'academic_dev_flow.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USER'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': config('DATABASE_HOST'),
        'PORT': config('DATABASE_PORT')
        
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'pt-br'

USE_I18N = True

# Defina o fuso horário padrão
TIME_ZONE = 'America/Sao_Paulo'

# Defina se as datas e horas serão armazenadas no banco de dados no fuso horário UTC
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/adflow-files/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'academic_dev_flow/run/static')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'academic_dev_flow/static')]

# User_Uploaded_Files
MEDIA_URL = '/adflow-files/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'academic_dev_flow/run/media')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
