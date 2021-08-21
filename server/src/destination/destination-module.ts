import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DestinationService } from "./application/destination-service";
import { Destinations } from "./domain/destinations";
import { Destination } from "./entity/destination";
import { DestinationController } from "./presentation/destination-controller";

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  controllers: [DestinationController],
  providers: [DestinationService, Destinations],
  exports: [DestinationService, Destinations],
})
export class DestinationModule {}
