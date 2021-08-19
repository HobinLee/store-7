import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core-module";
import properties from "./config/properties/properties";
import * as cookieParser from "cookie-parser";

const serverPort = properties.server.port;

const nestApplication = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(serverPort);
};

nestApplication();
