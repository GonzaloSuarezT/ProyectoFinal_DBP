FROM node:14

WORKDIR /programas/webReact

COPY package*.json ./

RUN npm install

COPY reactProject/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]