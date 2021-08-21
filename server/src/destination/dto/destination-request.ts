export interface DestinationRequest {
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  isDefault: number;
  addressee?: string;
  phoneNumber?: string;
}

export interface CreateDestinationRequest extends DestinationRequest {
  user: {
    id: number;
  };
  isDefault: number;
}

export interface DestinationModifyRequest {
  name?: string;
  postCode?: string;
  address?: string;
  detailAddress?: string;
  isDetault?: boolean;
}
