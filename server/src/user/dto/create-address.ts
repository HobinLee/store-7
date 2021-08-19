import { DestinationRequest } from "src/destination/dto/destination-request";

export interface FirstDestinationDTO {
  postCode: string;
  address: string;
  detailAddress: string;
}

export const createFirstDetination = (
  address: FirstDestinationDTO
): DestinationRequest => {
  return {
    name: "기본 배송지",
    postCode: address.postCode,
    address: address.address,
    detailAddress: address.address,
    isDetault: true,
  };
};
