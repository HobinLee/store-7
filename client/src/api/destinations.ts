import { DELETE, PATCH, POST } from "@/utils/axios";

// POST /destinations 배송지 추가
export const postDestination = (data: {
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  addressee: string;
  phoneNumber: string;
}) => POST("/destinations", { ...data, isDefault: false });

// PATCH /destinations/:id 배송지 수정
export const patchDestination = ({ id, data }) =>
  PATCH(`/destinations/${id}`, data);

// DELETE /destinations/:id 배송지 삭제
export const deleteDestination = (id: number) => DELETE(`/destinations/${id}`);
