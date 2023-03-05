FROM node:18-alpine
WORKDIR /test_docker
RUN yarn install --production
COPY . .
ENV NODE_ENV production
CMD ["node", "app.js"]
EXPOSE 8080