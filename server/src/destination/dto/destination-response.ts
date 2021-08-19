import { Destination } from "../entity/destination";

export class DestinationResponse {
  id: number;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  userId: number;
  isDefault: boolean;

  constructor(response: DestinationResponse) {
    this.id = response.id;
    this.name = response.name;
    this.postCode = response.postCode;
    this.address = response.address;
    this.detailAddress = response.detailAddress;
    this.userId = response.userId;
    this.isDefault = response.isDefault;
  }

  static of(destination: Destination): DestinationResponse {
    const id = destination.id,
      name = destination.name,
      postCode = destination.postCode,
      address = destination.address,
      detailAddress = destination.detailAddress,
      userId = destination.userId,
      isDefault = destination.isDefault;

    return new DestinationResponse({
      id,
      name,
      postCode,
      address,
      detailAddress,
      userId,
      isDefault,
    });
  }
}
