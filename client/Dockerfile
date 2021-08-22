FROM node:13.12.0-alpine as build
ENV BASE_URL=$BASE_URL
ENV IMG_URL=$IMG_URL
ENV DEMO_EMAIL=$DEMO_EMAIL
ENV DEMO_PW=$DEMO_PW

WORKDIR /app
COPY . .
RUN npm install
CMD ["echo", "$BASE_URL"]
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
