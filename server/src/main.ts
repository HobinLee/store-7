import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core-module";
import properties from "./config/properties/properties";
import * as cookieParser from "cookie-parser";

const serverPort = properties.server.port;

const nestApplication = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://store-7.woowahan-techcamp.shop/",
      ],
      credentials: true,
    },
  });
  app.use(cookieParser());
  await app.listen(serverPort);
};

nestApplication();
