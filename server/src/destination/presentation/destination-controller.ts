import { Body, Controller, Patch, Post, Delete, Param } from "@nestjs/common";
import { DestinationService } from "../application/destination-service";
import {
  DestinationRequest,
  DestinationModifyRequest,
} from "../dto/destination-request";

@Controller("/destinations")
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  createDestination(
    @Param("userId") userId: number,
    @Body() destination: DestinationRequest
  ): string {
    return this.destinationService.createDestination(1, destination);
  }

  //   @Get()
  //   async findDestinationsByUserId(
  //     @Body()
  //     userId: number
  //   ): Promise<DestinationResponse[]> {
  //     return await this.destinationService.findDestinationsByUserId(userId);
  //   }

  @Patch("/:id")
  updateDestination(
    @Param("id") id: number,
    @Body() modifiedDestination: DestinationModifyRequest
  ): string {
    return this.destinationService.updateDestination(id, modifiedDestination);
  }

  @Delete("/:id")
  deleteDestination(@Param("id") id: number): string {
    return this.destinationService.deleteDestination(id);
  }
}
