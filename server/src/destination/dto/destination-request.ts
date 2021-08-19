export interface DestinationRequest {
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  isDetault: boolean;
}

export interface CreateDestinationRequest extends DestinationRequest {
  userId: number;
}

export interface DestinationModifyRequest {
  name?: string;
  postCode?: string;
  address?: string;
  detailAddress?: string;
  userId?: number;
  isDetault?: boolean;
}
