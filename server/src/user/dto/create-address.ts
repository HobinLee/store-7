import { DestinationRequest } from "src/destination/dto/destination-request";

export interface FirstDestinationDTO {
  postCode: string;
  address: string;
  detailAddress: string;
}

export const createFirstDestination = (
  // userId: number,
  address: FirstDestinationDTO
): DestinationRequest => {
  return {
    // userId,
    name: "기본 배송지",
    postCode: address.postCode,
    address: address.address,
    detailAddress: address.detailAddress,
    isDefault: true,
  };
};
