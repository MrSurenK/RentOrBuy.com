FROM node:20-alpine

WORKDIR /frontend

ENV VITE_SERVER=http://localhost:8000

COPY package.json package-lock.json /frontend/

RUN npm install 

COPY . /frontend/

CMD ["npm", "run", "dev"]

