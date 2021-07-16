FROM node:alpine

WORKDIR /f1shy-bot

COPY ["./package.json", "./yarn.lock", "./"]
COPY ["./packages/bot/package.json", "./packages/bot/"]

RUN apk update && \
    npm i -g typescript rimraf prisma pm2 && \
    yarn

COPY . .

RUN ["yarn", "db:generate"]
RUN ["yarn", "workspace", "@f1shy-bot/bot", "run", "build"]
CMD ["pm2-runtime", "./packages/bot/dist/index.js"]