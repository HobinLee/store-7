import { DELETE, POST } from "@/utils/axios";

// DELETE /auth 로그아웃
export const logout = () => DELETE("/auth");

// POST /auth 로그인
export const login = () => POST("/auth");
