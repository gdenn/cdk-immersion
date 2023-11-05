FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install TypeScript
RUN npm install -g typescript

COPY . .

RUN tsc

EXPOSE 3000

CMD [ "node", "dist/index.js" ]