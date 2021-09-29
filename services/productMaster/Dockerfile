FROM node:12.16-alpine3.11

ARG NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set unsafe-perm true

RUN npm i --production

COPY src ./src

RUN echo $NODE_ENV

RUN if [ "$NODE_ENV" == "development" ] ; then npm i --only=dev ; fi

CMD [ "npm", "start" ]