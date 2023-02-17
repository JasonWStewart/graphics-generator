FROM node:lts-hydrogen

WORKDIR /usr/src/app

COPY . .

RUN cd client && yarn
RUN yarn build-client

RUN cd server && yarn

COPY . .

EXPOSE 3000

CMD ["node","./server/server.js"]
