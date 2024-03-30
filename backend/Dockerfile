FROM node:18
WORKDIR /var/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY ./build/ ./build/

ENV PORT=3031
ENV CORS_ALLOWED_ORIGIN=localhost:3031
EXPOSE 3031
HEALTHCHECK CMD curl --fail http://localhost:3031/healthcheck || exit 1
ENTRYPOINT ["node", "."]
