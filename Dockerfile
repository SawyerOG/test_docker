FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --production
COPY /dist .
ENV NODE_ENV production
CMD ["node", "app.js"]
EXPOSE 8080