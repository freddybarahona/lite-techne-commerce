#Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

#Dependencias de shared
COPY backend/src/microservices/shared/package.json ./microservices/shared/
RUN cd microservices/shared && npm install

#Dependencias de catalog 
COPY backend/src/microservices/catalog/package.json ./microservices/catalog/
RUN cd microservices/catalog && npm install

#Codigo fuente (shared + catalog)
COPY backend/src/microservices/shared/ ./microservices/shared/
COPY backend/src/microservices/catalog/ ./microservices/catalog/

#Compilar typescript a javascript
RUN cd microservices/catalog && npx tsc

#shared se compila dentro de catalog/dist/shared → sus deps deben vivir en catalog/node_modules
RUN cp -rf /app/microservices/shared/node_modules/. /app/microservices/catalog/node_modules/

#Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

#copiar compilado + node modules
COPY --from=build /app/microservices/shared/ ./microservices/shared/
COPY --from=build /app/microservices/catalog/ ./microservices/catalog/

WORKDIR /app/microservices/catalog

EXPOSE 3001

CMD ["npm", "start"]

#docker build -f backend/dockerfiles/catalog.dockerfile -t litetechne-catalog .
#docker run -d --name litetechne-catalog -p 3001:3001 litetechne-catalog