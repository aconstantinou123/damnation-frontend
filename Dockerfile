FROM node:16.8.0-alpine3.13

ENV GROUP_ID=1001 \
    USER_ID=1001

ADD . /code
WORKDIR /code

RUN yarn install

RUN addgroup -g $GROUP_ID code
RUN adduser -D -u $USER_ID -G code code -s /bin/sh

USER code

EXPOSE 3000

CMD yarn start