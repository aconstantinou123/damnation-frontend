FROM node:16.6.2
ADD . /code
WORKDIR /code
RUN npm install
EXPOSE 3000
CMD npm start