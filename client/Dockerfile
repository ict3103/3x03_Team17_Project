FROM node:alpine
WORKDIR /client
COPY package.json
COPY package-lock.json 
RUN npm install
CMD ["npm", "run", "start"]