FROM node:18

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
