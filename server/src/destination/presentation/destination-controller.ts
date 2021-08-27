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
  async createDestination(
    @Body() body: { data: DestinationRequest; userId: number }
  ): Promise<string> {
    return await this.destinationService.createDestination(
      body.userId,
      body.data
    );
  }

  @Patch("/:id")
  async updateDestination(
    @Param("id") id: number,
    @Body() body: { data: DestinationModifyRequest; userId: number }
  ): Promise<string> {
    return await this.destinationService.updateDestination(id, body.data);
  }

  @Patch("/:id/default")
  async updateDefaultDestination(
    @Body("userId") userId: number,
    @Param("id") id: number
  ): Promise<string> {
    return await this.destinationService.updateDefaultDestination(userId, id);
  }

  @Delete("/:id")
  async deleteDestination(@Param("id") id: number): Promise<string> {
    return await this.destinationService.deleteDestination(id);
  }
}
