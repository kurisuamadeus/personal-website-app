FROM node:20-alpine3.19

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm update

CMD [ "npm", "start" ]

ENV PORT=80

EXPOSE $PORT