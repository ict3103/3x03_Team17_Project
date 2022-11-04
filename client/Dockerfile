FROM node:alpine
ADD . /client_side
WORKDIR /client_side
COPY package.json
COPY package-lock.json 
RUN npm install
CMD ["npm", "run", "start"]