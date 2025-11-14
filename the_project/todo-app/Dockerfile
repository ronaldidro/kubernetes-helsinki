FROM node:22-alpine AS builder

WORKDIR /build

COPY package.json .

RUN npm install --production

COPY server.js .

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /build /app

EXPOSE 3000

CMD ["npm", "start"]
