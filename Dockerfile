# Etapa 1: Construcción y Compilación
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./ 

# Instalamos TODAS las dependencias (necesarias para compilar TS)
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos el proyecto (genera la carpeta /dist)
RUN npm run build

# Limpiamos dependencias de desarrollo para dejar solo las de producción
RUN npm prune --production


# Etapa 2: Imagen Final de Producción
FROM node:18-alpine

# Seguridad: creamos un usuario sin privilegios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiamos solo lo estrictamente necesario de la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
# El .env suele pasarse por el docker-compose, pero si lo necesitas dentro:
# COPY .env ./ 
COPY public ./public 
# Ajustamos permisos
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

# Healthcheck para verificar que la API responda
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]

