import { Injectable } from "@nestjs/common";
import { Destinations } from "../domain/destinations";
import {
  DestinationRequest,
  DestinationResponse,
  DestinationModifyRequest,
} from "../dto/destination-request";

@Injectable()
export class DestinationService {
  constructor(private readonly destinations: Destinations) {}

  async findDestinationsByUserId(id: number): Promise<DestinationResponse[]> {
    try {
      const data = await this.destinations.findDestinationsByUserId(id);
      return data;
    } catch (e) {
      return e;
    }
  }

  createDestination(destination: DestinationRequest): string {
    try {
      this.destinations.createDestination(destination);
    } catch (e) {
      return e;
    }
    return "Created!";
  }

  updateDestination(
    userId: number,
    destinationModifyRequest: DestinationModifyRequest
  ): string {
    try {
      this.destinations.updateDestination(userId, destinationModifyRequest);
    } catch (e) {
      return e;
    }
    return "Updated!";
  }

  deleteDestination(id: number): string {
    try {
      this.destinations.deleteDestination(id);
    } catch (e) {
      return e;
    }
    return "Deleted!";
  }
}
