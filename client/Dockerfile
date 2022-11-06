FROM node:alpine
ADD ./client /client_side
WORKDIR /client_side
RUN  npm install
EXPOSE 3000
CMD ["npm","start"]