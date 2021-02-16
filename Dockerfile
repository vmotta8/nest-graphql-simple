FROM node:12-alpine

WORKDIR /home/api 

COPY package.json .
COPY yarn.lock .

RUN yarn 

COPY . .

CMD yarn start