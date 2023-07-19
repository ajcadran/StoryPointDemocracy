FROM node:18

WORKDIR /usr/src/client

RUN npm install serve

COPY . .

EXPOSE 8080

CMD [ "npx", "serve", "public", "-p", "8080" ]
