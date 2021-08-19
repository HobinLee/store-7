export interface DestinationRequest {
  userId: number;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface DestinationModifyRequest {
  name?: string;
  postCode?: string;
  address?: string;
  detailAddress?: string;
  userId?: number;
  isDetault?: boolean;
}
