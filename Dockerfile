ARG BASE_IMAGE=node:10.15
FROM ${BASE_IMAGE}
USER root

COPY . /usr/src/app/
WORKDIR /usr/src/app

EXPOSE 8080
RUN npm install
CMD [ "node", "src/server.js" ]
