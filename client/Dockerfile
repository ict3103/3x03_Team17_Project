FROM node:alpine
ADD . /client_side
WORKDIR /client_side
COPY package.json ./client_side
COPY package-lock.json ./client_side
RUN npm install
CMD ["npm", "run", "start"]