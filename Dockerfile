# Use uma imagem oficial do Python como base
FROM python:3.11-slim

# Instale dependências do sistema necessárias para compilar psycopg2
RUN apt-get update && \
    apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho dentro do container
WORKDIR /backend

ENV PYTHONPATH="${PYTHONPATH}:/backend"
ENV PATH="$PATH:/backend"

# Copie os arquivos de requisitos para o diretório de trabalho
COPY requirements.txt .

# Instale as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie apenas os arquivos necessários para o diretório de trabalho
COPY manage.py .
COPY academic_dev_flow/ academic_dev_flow/
COPY apps/ apps/
COPY docs/ docs/
COPY README.md .
COPY .gitignore .

# Exponha a porta que o Django usará
EXPOSE 8000
