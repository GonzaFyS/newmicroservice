FROM node:16.5.0 as build

WORKDIR /home/node
COPY . /home/node

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

ARG BUILD

ENV NODE_ENV='development'
ENV CI=true
ENV REACT_APP_BUILD=$BUILD


RUN npm install
#RUN npm run test
RUN npm run build

# Production Image
FROM node:16.5.0

WORKDIR /home/node

COPY package.json .
COPY --from=build /home/node/build /home/node/build

EXPOSE 80

ENV NODE_ENV='production'

RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]