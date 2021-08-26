FROM node:16.6.2
ADD . /code
WORKDIR /code
RUN yarn install
RUN rm -rf build
RUN yarn build
EXPOSE 3000
CMD yarn production