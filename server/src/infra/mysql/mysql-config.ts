import { TypeOrmModule } from "@nestjs/typeorm";
import properties from "../../config/properties/properties";

const mysqlConfnig = properties.mysql;

export default TypeOrmModule.forRoot({
  type: "mysql",
  host: mysqlConfnig.host,
  port: mysqlConfnig.port,
  username: mysqlConfnig.username,
  password: mysqlConfnig.password,
  database: mysqlConfnig.database,
  synchronize: true,
  autoLoadEntities: true,
});
