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

  createDestination(userId: number, destination: DestinationRequest): string {
    try {
      this.destinations.createDestination({
        ...destination,
        user: { id: userId },
        isDefault: destination.isDefault ? 1 : 0,
      });
    } catch (e) {
      throw Error(e.message);
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
      throw Error(e.message);
    }
    return "Updated!";
  }

  async updateDefaultDestination(userId: number, id: number): Promise<string> {
    try {
      const allDestinations = await this.destinations.findDestinationsByUserId(
        userId
      );
      allDestinations.forEach(async (d) => {
        if (d.id !== id)
          await this.destinations.updateDestinationIsDefault(d.id, false);
      });
      await this.destinations.updateDestinationIsDefault(id, true);
    } catch (e) {
      throw Error(e.message);
    }
    return "Updated!";
  }

  deleteDestination(id: number): string {
    try {
      this.destinations.deleteDestination(id);
    } catch (e) {
      throw Error(e.message);
    }
    return "Deleted!";
  }
}
