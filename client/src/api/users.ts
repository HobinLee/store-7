import { AddressType } from "@/shared/type";
import { GET, POST } from "@/utils/axios";

export interface signupRequestBody {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: AddressType;
}
// POST /users 회원가입
export const signup = async (data: signupRequestBody) =>
  await POST("/users", data);

// GET /users?email 이메일 중복확인
export const verifyEmail = ({ params }) => GET("/users", params);
