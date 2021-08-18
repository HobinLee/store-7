import { GET, POST } from "@/utils/axios";

// POST /users 회원가입
export const signup = ({ data }) => POST("/users", data);

// GET /users?email 이메일 중복확인
export const verifyEmail = ({ params }) => GET("/users", params);
