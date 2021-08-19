import { FirstDestinationDTO } from "./create-address";
import { CreateUserDTO } from "./create-user";

export interface SignupRequest extends CreateUserDTO {
  address: FirstDestinationDTO;
}
