FROM node:16.15-alpine

WORKDIR /usr/src/app

COPY . .
RUN yarn install --frozen-lockfile

EXPOSE 4200
CMD [ "yarn", "start:server" ]



