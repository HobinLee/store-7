export interface DestinationRequest {
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  isDefault: number;
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
  userId?: number;
  isDetault?: boolean;
}
