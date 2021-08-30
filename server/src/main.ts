import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core-module";
import properties from "./config/properties/properties";
import * as cookieParser from "cookie-parser";
import { HttpExceptionFilter } from "./config/filter/exception-handler";

const serverPort = properties.server.port;

const nestApplication = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [properties.client],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  await app.listen(serverPort);
};

nestApplication();
