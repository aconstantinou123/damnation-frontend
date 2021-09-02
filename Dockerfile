FROM node:16.8.0-alpine3.13

ADD . /code
WORKDIR /code

RUN yarn install

EXPOSE 3000

CMD yarn start