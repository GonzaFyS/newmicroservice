FROM node:16.5.0

WORKDIR /home/node
COPY . /home/node

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 80

ARG BUILD

ENV NODE_ENV='production'
ENV CI=true
ENV REACT_APP_BUILD=$BUILD


RUN npm install
#RUN npm run test

ENTRYPOINT [ "npm", "run", "start" ]