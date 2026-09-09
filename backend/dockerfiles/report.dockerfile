#Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

#Dependencias de shared
COPY backend/src/microservices/shared/package.json ./microservices/shared/
RUN cd microservices/shared && npm install

#Dependencias de report 
COPY backend/src/microservices/report/package.json ./microservices/report/
RUN cd microservices/report && npm install

#Codigo fuente (shared + report)
COPY backend/src/microservices/shared/ ./microservices/shared/
COPY backend/src/microservices/report/ ./microservices/report/

#Compilar typescript a javascript
RUN cd microservices/report && npx tsc

#shared se compila dentro de report/dist/shared → sus deps deben vivir en report/node_modules
RUN cp -rf /app/microservices/shared/node_modules/. /app/microservices/report/node_modules/

#Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

#copiar compilado + node modules
COPY --from=build /app/microservices/shared/ ./microservices/shared/
COPY --from=build /app/microservices/report/ ./microservices/report/

WORKDIR /app/microservices/report

EXPOSE 3002

CMD ["npm", "start"]

#docker build -f backend/dockerfiles/report.dockerfile -t litetechne-report .
#docker run -d --name litetechne-report -p 3003:3003 litetechne-report