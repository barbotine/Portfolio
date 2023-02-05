FROM node:16-slim

RUN mkdir /project
RUN cd /project && npm i bootstrap bootstrap-vue && npm install three && npm install vue-router
WORKDIR /project
