export interface CreateUserDTO {
  email: string;
  password: string; //encoded password
  name: string;
  phoneNumer?: string;
  profile?: string;
}
