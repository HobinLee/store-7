import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateDestinationRequest,
  DestinationModifyRequest,
} from "../dto/destination-request";
import { Destination } from "../entity/destination";

@Injectable()
export class Destinations {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>
  ) {}

  async findDestinationsByUserId(userId: number) {
    return await this.destinationRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  }

  async createDestination(destination: CreateDestinationRequest) {
    return this.destinationRepository.insert(destination);
  }

  async updateDestination(id: number, destination: DestinationModifyRequest) {
    return await this.destinationRepository.update({ id }, { ...destination });
  }

  async deleteDestination(id: number) {
    await this.destinationRepository.delete({ id });
  }
}
