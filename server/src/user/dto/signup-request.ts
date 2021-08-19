export interface SignupRequest {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  profile?: string;
  address: {
    postCode: string;
    address: string;
    detailAddress: string;
  };
}
