import { Module } from "@nestjs/common";
import MysqlConfig from "./infra/mysql/mysql-config";
import { UserModule } from "./user/user-module";
import { ProductModule } from "./product/product-module";

@Module({
  imports: [MysqlConfig, UserModule, ProductModule],
})
export class AppModule {}
