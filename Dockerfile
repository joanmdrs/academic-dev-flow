# Dockerfile para o backend

# Use uma imagem oficial do Python como base
FROM python:3.11-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de requisitos para o diretório de trabalho
COPY requirements.txt .

# Instale as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Defina a variável de ambiente para a aplicação Django
ENV DJANGO_SETTINGS_MODULE=academic_dev_flow.settings

# Exponha a porta que o Django usará
EXPOSE 8000

# Comando para iniciar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
