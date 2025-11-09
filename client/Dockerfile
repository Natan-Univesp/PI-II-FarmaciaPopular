FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm ci

# Copiar source e build
COPY . .
RUN npm run build

# Servir com Nginx
FROM nginx:latest
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE $PORT

# Comando de start
CMD ["nginx", "-g", "daemon off;"]