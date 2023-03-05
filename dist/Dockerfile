FROM node:18-alpine
WORKDIR /test_docker
COPY . .
VOLUME /node_modules
RUN yarn install --production
ENV NODE_ENV production
CMD ["node", "app.js"]
EXPOSE 8080