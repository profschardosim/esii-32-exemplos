#build typescript application
FROM node:24-alpine as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/server.js"]