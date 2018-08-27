FROM node:9.6.1
COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app/
RUN npm install
RUN npm install -g @angular/cli@1.7.1
COPY . /usr/src/app
EXPOSE 4200
CMD  [ "npm", "start"]