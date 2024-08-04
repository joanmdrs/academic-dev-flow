# Usar uma imagem base do Node.js
FROM node:14-alpine

# Definir o diretório de trabalho
WORKDIR /frontend

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Compilar a aplicação para produção
RUN npm run build

# Usar uma imagem base do Nginx para servir a aplicação compilada
FROM nginx:1.21-alpine

# Copiar os arquivos compilados para o diretório de servidão do Nginx
COPY --from=0 /frontend/build /usr/share/nginx/html

# Expor a porta que o Nginx vai utilizar
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
