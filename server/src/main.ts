import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core-module";
import properties from "./config/properties/properties";

const serverPort = properties.server.port;

const nestApplication = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverPort);
};

nestApplication();
