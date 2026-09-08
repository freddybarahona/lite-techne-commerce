#Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Dependencias de shared
COPY backend/src/microservices/shared/package.json ./microservices/shared/
RUN cd microservices/shared && npm install

# Dependencias de auth
COPY backend/src/microservices/auth/package.json ./microservices/auth/
RUN cd microservices/auth && npm install

# Código fuente (shared + auth)
COPY backend/src/microservices/shared/ ./microservices/shared/
COPY backend/src/microservices/auth/ ./microservices/auth/

# Compilar TypeScript a JavaScript
RUN cd microservices/auth && npx tsc

#Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar compilado + node_modules
COPY --from=build /app/microservices/shared/ ./microservices/shared/
COPY --from=build /app/microservices/auth/ ./microservices/auth/

WORKDIR /app/microservices/auth

EXPOSE 3000

CMD ["npm", "start"]

#/app/
#  microservices/
#    auth/      ← aquí ejecuta node dist/server.js
#    shared/    ← necesario para los imports ../../../../shared/...
#Esto replica la estructura backend/src/microservices/ que tienes local, así las rutas relativas siguen funcionando igual.

#por cierto nodemon es para typescript, tsc es para javascript no lo confundas

#docker build -f <ruta|nombre del archivo> -t <nombre de la imagen a crear> 

#ejemplos
#docker build -t litetechne-auth .   si el archivo es generico (.dockerfile)    
#docker build -f backend/dockerfiles/auth.dockerfile -t litetechne-auth .
#docker build -f auth.dockerfile -t litetechne-auth .


#docker build -f backend/dockerfiles/auth.dockerfile -t litetechne-auth .
#docker run -d --name litetechne-auth -p 3000:3000 litetechne-auth