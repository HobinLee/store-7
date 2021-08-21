export interface CreateUserDTO {
  email: string;
  password: string; //encoded password
  name: string;
  phoneNumber?: string;
  profile?: string;
}
