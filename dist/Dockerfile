FROM node:18-alpine
WORKDIR /test_docker
COPY . .
RUN yarn install --production
CMD ["node", "dist/app.js"]
EXPOSE 8080