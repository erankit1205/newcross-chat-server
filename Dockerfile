FROM node:latest

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY . /usr/app
RUN npm i

EXPOSE 3000
CMD npm start