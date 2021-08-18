import { Module } from "@nestjs/common";
import MysqlConfig from "./infra/mysql/mysql-config";
import { UserModule } from "./user/user-module";

@Module({
  imports: [MysqlConfig, UserModule],
})
export class AppModule {}
