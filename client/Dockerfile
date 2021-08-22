FROM node:13.12.0-alpine as build
ENV BASE_URL=$CLIENT_BASE_URL
ENV IMG_URL=$CLIENT_IMG_URL
ENV DEMO_EMAIL=$CLIENT_DEMO_EMAIL
ENV DEMO_PW=$CLIENT_DEMO_PW

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
