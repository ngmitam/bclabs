# Build NestJs app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

# Run NestJs app
FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/EMAIL_TEMPLATES ./EMAIL_TEMPLATES
COPY ./.env ./.env

CMD ["node", "dist/main"]
