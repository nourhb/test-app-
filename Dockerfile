FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY src ./src
COPY public ./public

RUN chmod -R 777 /app

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
