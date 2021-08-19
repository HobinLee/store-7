import { TypeOrmModule } from "@nestjs/typeorm";
import properties from "../../config/properties/properties";

const mysqlConfig = properties.mysql;

export default TypeOrmModule.forRoot({
  type: "mysql",
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  synchronize: true,
  autoLoadEntities: true,
});
