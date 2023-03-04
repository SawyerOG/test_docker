FROM node:18-alpine
WORKDIR /test_docker
COPY . .
RUN yarn install --production
CMD ["node", "app.js"]
EXPOSE 8080