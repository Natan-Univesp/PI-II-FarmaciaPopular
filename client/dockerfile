FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm ci

# Copiar source e build
COPY . .
RUN npm run build

# Expor porta
EXPOSE $PORT

# Comando de start
CMD ["npm", "run", "start"]