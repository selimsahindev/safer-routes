FROM node:lts-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm run build

RUN pnpm run start
