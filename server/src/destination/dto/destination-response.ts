import { Destination } from "../entity/destination";

export class DestinationResponse {
  id: number;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
  addressee: string;
  phoneNumber: string;

  static of(destination: Destination): DestinationResponse {
    const id = destination.id,
      name = destination.name,
      postCode = destination.postCode,
      address = destination.address,
      detailAddress = destination.detailAddress,
      isDefault = destination.isDefault === 1 ? true : false,
      addressee = destination.addressee,
      phoneNumber = destination.phoneNumber;

    return {
      id,
      name,
      postCode,
      address,
      detailAddress,
      isDefault,
      addressee,
      phoneNumber,
    } as DestinationResponse;
  }
}
