import { moveTo } from "@/Router";
import { DELETE, GET, POST } from "@/utils/axios";

export interface signInRequestBody {
  email: string;
  password: string;
}

// POST /auth 로그인
export const signIn = async (loginInfo: signInRequestBody) => {
  await POST("/auth", loginInfo);
  moveTo("/");
};

// DELETE /auth 로그아웃
export const signOut = async () => await DELETE("/auth");

export const verifyToken = async () => await GET("/auth");
