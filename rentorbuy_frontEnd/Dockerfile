FROM node:20-alpine

WORKDIR /frontend

ENV VITE_SERVER=http://127.0.0.1:8000/

COPY package.json package-lock.json /frontend/

RUN npm install 

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

