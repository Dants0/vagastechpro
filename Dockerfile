# Usa Node 20 no Linux Alpine (leve)
FROM node:20-alpine

WORKDIR /app

# 1. Instala dependências do Sistema Operacional
# (Chromium para o Bot, OpenSSL para o Prisma)
RUN apk add --no-cache \
    openssl \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# 2. Configura Variáveis de Ambiente do Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# 3. Prepara a RAÍZ (Bot e Prisma)
# Copia apenas os package.json primeiro para aproveitar cache do Docker
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências da raiz
RUN npm ci

# Gera o cliente do Prisma (para o Bot e para o Site usarem)
RUN npx prisma generate

# 4. Prepara a WEB (Next.js)
COPY web/package*.json ./web/

# Entra na pasta web e instala dependências do site
RUN cd web && npm ci

# 5. Copia todo o código fonte do projeto
COPY . .

# 6. Constrói o Site Next.js
# O Next vai buscar o prisma client na raiz (../node_modules) e vai achar
RUN cd web && npm run build

# 7. Expõe a porta do site
EXPOSE 3000

# 8. COMANDO FINAL
# Executa o script 'start:prod' que definimos no package.json da RAÍZ
CMD ["npm", "run", "start:prod"]