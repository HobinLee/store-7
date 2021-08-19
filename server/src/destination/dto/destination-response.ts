import { Destination } from "../entity/destination";

export class DestinationResponse {
  id: number;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  userId: number;
  isDefault: boolean;

  static of(destination: Destination): DestinationResponse {
    const id = destination.id,
      name = destination.name,
      postCode = destination.postCode,
      address = destination.address,
      detailAddress = destination.detailAddress,
      userId = destination.userId,
      isDefault = destination.isDefault;

    return {
      id,
      name,
      postCode,
      address,
      detailAddress,
      userId,
      isDefault,
    } as DestinationResponse;
  }
}
