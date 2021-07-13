FROM node:alpine

WORKDIR /f1shybot

COPY ["package.json", "yarn.lock", "./"]

RUN apk update && \
    npm i -g typescript rimraf prisma pm2 && \
    yarn

COPY . .

RUN ["yarn", "db:generate"]
RUN ["yarn", "build"]
CMD ["pm2-runtime", "dist/index.js"]