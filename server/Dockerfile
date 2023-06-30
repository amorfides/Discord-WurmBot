FROM node:18


WORKDIR /home/node
RUN mkdir tmp app

WORKDIR tmp
COPY package.json  package-lock.jso[n] ./
RUN npm install

WORKDIR ../app
COPY *.js package.json .env  ./

RUN npm install\
 && rm -Rf ../tmp

ADD src/ ./src/








CMD ["sh", "-c", "npm run start"]