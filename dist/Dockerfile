FROM node:18-alpine
WORKDIR /dist
COPY . .
RUN yarn install --production
CMD ["node", "app.js"]
EXPOSE 8080