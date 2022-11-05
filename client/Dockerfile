FROM node:alpine
ADD ./client ./
WORKDIR ./
RUN npx create-react-app client --use-npm
CMD ["npm","start"]