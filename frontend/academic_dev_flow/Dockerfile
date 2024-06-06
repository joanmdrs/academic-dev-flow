# Dockerfile para o frontend

# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de configuração do Node.js para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do Node.js
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Construa o projeto
RUN npm run build

# Exponha a porta que a aplicação React usará
EXPOSE 3000

# Comando para iniciar a aplicação React
CMD ["npm", "start"]
