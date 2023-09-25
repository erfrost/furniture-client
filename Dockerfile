# Определение базового образа
FROM node:18.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]