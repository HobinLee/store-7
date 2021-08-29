import messages from "@/config/messages";
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
    try {
      const destinations = await this.destinations.findDestinationsByUserId(id);
      return destinations.map(DestinationResponse.of);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_DESTINATIONS_BY_USER_ID);
    }
  }

  async createDestination(
    userId: number,
    destination: DestinationRequest
  ): Promise<string> {
    try {
      await this.destinations.createDestination({
        ...destination,
        user: { id: userId },
        isDefault: destination.isDefault ? 1 : 0,
      });
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_CREATE_DESTINATION);
    }
    return messages.success.SUCCESS_TO_CREATE_DESTINATION;
  }

  async updateDestination(
    id: number,
    destinationModifyRequest: DestinationModifyRequest
  ): Promise<string> {
    try {
      await this.destinations.updateDestination(id, destinationModifyRequest);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_UPDATE_DESTINATION);
    }
    return messages.success.SUCCESS_TO_UPDATE_DESTINATION;
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
      throw new Error(messages.failed.FAILED_TO_UPDATE_DEFAULT_DESTINATION);
    }
    return messages.success.SUCCESS_TO_UPDATE_DEFAULT_DESTINATION;
  }

  async deleteDestination(id: number): Promise<string> {
    try {
      await this.destinations.deleteDestination(id);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_DELETE_DESTINATION);
    }
    return messages.success.SUCCESS_TO_DELETE_DESTINATION;
  }
}
