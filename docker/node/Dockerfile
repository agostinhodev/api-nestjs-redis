###############################
# BUILD FOR LOCAL DEVELOPMENT #
###############################
FROM node:latest As development

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

RUN npm install --location=global @nestjs/cli

USER node

EXPOSE 3000