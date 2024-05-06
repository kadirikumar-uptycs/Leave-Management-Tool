FROM node:21

WORKDIR /frontend-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g serve

EXPOSE 17293

CMD ["serve", "-s", "build", "-l", "172911"]