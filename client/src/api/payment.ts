import { GET, POST } from "@/utils/axios";

export const postPaymentReady = (body) => POST("/payment/ready", body);

export const postPaymentApprove = () => GET("/payment/approve");
