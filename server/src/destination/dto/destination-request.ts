export interface DestinationRequest {
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  userId: number;
  isDetault: boolean;
}

export interface DestinationModifyRequest {
  name?: string;
  postCode?: string;
  address?: string;
  detailAddress?: string;
  userId?: number;
  isDetault?: boolean;
}

export interface DestinationResponse {
  id: number;
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  userId: number;
  isDetault: boolean;
}
