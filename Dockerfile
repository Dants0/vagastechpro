# Usa Node 20 no Linux Alpine (leve)
FROM node:20-alpine

WORKDIR /app

# 1. Instala dependências do Sistema Operacional
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

# --- CORREÇÃO IMPORTANTE ---
# Garante que o NPM instale dependências de desenvolvimento (Tailwind, TSX, Typescript)
# mesmo que o Coolify injete NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false

# 3. Prepara a RAÍZ (Bot e Prisma)
COPY package*.json ./
COPY prisma ./prisma/

# Instala TODAS as dependências da raiz (incluindo 'tsx' e 'prisma' CLI)
RUN npm ci --include=dev

# Gera o cliente do Prisma
RUN npx prisma generate

# 4. Prepara a WEB (Next.js)
COPY web/package*.json ./web/

# Entra na pasta web e instala dependências do site (incluindo Tailwind)
RUN cd web && npm ci --include=dev

# 5. Copia todo o código fonte do projeto
COPY . .

# 6. Constrói o Site Next.js
# Agora vai funcionar porque o Tailwind foi instalado no passo anterior
RUN cd web && npm run build

# 7. Expõe a porta do site
EXPOSE 3000
EXPOSE 7676

# 8. COMANDO FINAL
CMD ["npm", "run", "start:prod"]