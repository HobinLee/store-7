import { Injectable } from "@nestjs/common";
import { Destinations } from "../domain/destinations";
import {
  DestinationModifyRequest,
  DestinationRequest,
} from "../dto/destination-request";
import { DestinationResponse } from "../dto/destination-response";

@Injectable()
export class DestinationService {
  constructor(private readonly destinations: Destinations) {}

  async findDestinationsByUserId(id: number): Promise<DestinationResponse[]> {
    const destinations = await this.destinations.findDestinationsByUserId(id);
    return destinations.map(DestinationResponse.of);
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
    id: number,
    destinationModifyRequest: DestinationModifyRequest
  ): string {
    try {
      this.destinations.updateDestination(id, destinationModifyRequest);
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
