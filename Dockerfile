FROM node:19.6.0

WORKDIR /client

COPY ./package.json /client

RUN npm install

COPY . /client

RUN npm run build

EXPOSE 80

CMD ["npm", "start", "-p", "80"]
