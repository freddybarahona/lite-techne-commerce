#Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

#Dependencias de shared
COPY backend/src/microservices/shared/package.json ./microservices/shared/
RUN cd microservices/shared && npm install

#Dependencias de inventory 
COPY backend/src/microservices/inventory/package.json ./microservices/inventory/
RUN cd microservices/inventory && npm install

#Codigo fuente (shared + inventory)
COPY backend/src/microservices/shared/ ./microservices/shared/
COPY backend/src/microservices/inventory/ ./microservices/inventory/

#Compilar typescript a javascript
RUN cd microservices/inventory && npx tsc

#shared se compila dentro de inventory/dist/shared → sus deps deben vivir en inventory/node_modules
RUN cp -rf /app/microservices/shared/node_modules/. /app/microservices/inventory/node_modules/

#Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

#copiar compilado + node modules
COPY --from=build /app/microservices/shared/ ./microservices/shared/
COPY --from=build /app/microservices/inventory/ ./microservices/inventory/

WORKDIR /app/microservices/inventory

EXPOSE 3002

CMD ["npm", "start"]

#docker build -f backend/dockerfiles/inventory.dockerfile -t litetechne-inventory .
#docker run -d --name litetechne-inventory -p 3001:3001 litetechne-inventory