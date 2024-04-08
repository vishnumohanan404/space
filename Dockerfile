FROM node:20-alpine

WORKDIR /space

COPY . .

RUN npm install

CMD ["npm", "start"]