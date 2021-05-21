FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

RUN npm install npm@7

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]