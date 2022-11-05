FROM node:alpine
ADD ./client ./
WORKDIR ./
RUN npx create-react-app client --use-npm
RUN npm install
CMD ["npm","start"]