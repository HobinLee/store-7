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
    @Body() body: { data: DestinationRequest; userId: number }
  ): string {
    return this.destinationService.createDestination(body.userId, body.data);
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
    @Body() body: { data: DestinationModifyRequest; userId: number }
  ): string {
    return this.destinationService.updateDestination(id, body.data);
  }

  @Delete("/:id")
  deleteDestination(@Param("id") id: number): string {
    return this.destinationService.deleteDestination(id);
  }
}
