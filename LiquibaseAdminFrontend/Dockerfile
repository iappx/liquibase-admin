FROM node:current-alpine3.18 AS build
WORKDIR /app
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
RUN apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation fontconfig
COPY package.json package.json
COPY . .
RUN npm i
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/dist /web/html
COPY nginx.conf /etc/nginx/nginx.conf
