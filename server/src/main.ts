import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core-module";
import properties from "./config/properties/properties";
import * as cookieParser from "cookie-parser";

const serverPort = properties.server.port;

const nestApplication = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // "origin": "https://store-7.woowahan-techcamp.shop",
    origin: [properties.client, "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(serverPort);
};

nestApplication();
