# Build NestJs app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Run NestJs app
FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
