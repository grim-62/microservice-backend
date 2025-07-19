# Dockerfile (inside gateway/, user/, post/ folders)

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 3001
# Or whatever port your service runs on

CMD ["npm", "start"]
