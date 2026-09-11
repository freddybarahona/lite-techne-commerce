FROM traefik:v3.7
COPY backend/src/gateway/traefik.yml /etc/traefik/traefik.yml
COPY backend/src/gateway/dynamic/dynamic.yml /etc/traefik/dynamic/dynamic.yml