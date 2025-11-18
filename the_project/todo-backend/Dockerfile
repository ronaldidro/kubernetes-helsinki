FROM node:22-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /api

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /build/dist ./dist

CMD ["node", "dist/main.js"]