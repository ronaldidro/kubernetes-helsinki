FROM node:22-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci --production

COPY . .

CMD ["npm", "start"]
