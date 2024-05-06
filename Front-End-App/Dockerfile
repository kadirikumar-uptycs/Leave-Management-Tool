FROM node:21

WORKDIR /frontend-app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm install -g serve

EXPOSE 17290

CMD ["serve", "-s", "build", "-l", "17290"]