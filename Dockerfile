FROM node:22-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci 
COPY . .

RUN npm run build 
# RUN npm prune --production

CMD [ "npm", "run", "preview"]
EXPOSE 5009
# docker run --name=moneycount --restart unless-stopped -dp 5009:5009 moneycount:<version>
