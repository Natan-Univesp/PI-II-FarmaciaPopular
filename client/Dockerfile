FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm ci

# Copiar source e build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copia o build do React para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE $PORT

# Comando de start
CMD ["nginx", "-g", "daemon off;"]