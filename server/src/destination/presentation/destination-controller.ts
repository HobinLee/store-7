import { Body, Controller, Get, Patch, Post, Delete } from "@nestjs/common";
import { DestinationService } from "../application/destination-service";
import {
  DestinationRequest,
  DestinationResponse,
  DestinationModifyRequest,
} from "../dto/destination-request";

@Controller("/destinations")
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  createDestination(@Body() destinationRequest: DestinationRequest): string {
    return this.destinationService.createDestination(destinationRequest);
  }

  @Get()
  async findDestinationsByUserId(
    @Body()
    userId: number
  ): Promise<DestinationResponse[]> {
    return await this.destinationService.findDestinationsByUserId(userId);
  }

  @Patch()
  updateDestination(
    @Body()
    id: number,
    destinationModifyRequest: DestinationModifyRequest
  ): string {
    return this.destinationService.updateDestination(
      id,
      destinationModifyRequest
    );
  }

  @Delete()
  deleteDestination(@Body() id: number): string {
    return this.destinationService.deleteDestination(id);
  }
}
