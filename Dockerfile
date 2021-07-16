FROM node:alpine

WORKDIR /f1shybot

COPY ["./packages/bot/package.json", "./packages/bot/yarn.lock", "./packages/bot/"]

RUN apk update && \
    npm i -g typescript rimraf prisma pm2 && \
    yarn

COPY ./packages/bot/ .

# RUN ["yarn", "db:generate"]
RUN ["yarn", "build"]
CMD ["pm2-runtime", "dist/index.js"]