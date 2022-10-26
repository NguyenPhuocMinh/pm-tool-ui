FROM node:lts-alpine3.15 AS developement

# Create directory containing source code
WORKDIR /usr/src/app
# Coppy to folder create
COPY package*.json ./
# Run install dependencies
RUN npm install

ENV REACT_APP_REST_API_PROVIDER=http://localhost:8080

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=developement /usr/src/app/build /usr/share/nginx/html