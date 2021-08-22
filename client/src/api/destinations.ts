import { DELETE, PATCH, POST } from "@/utils/axios";

// POST /destinations 배송지 추가
export const postDestination = (data: {
  data: {
    name: string;
    postCode: string;
    address: string;
    detailAddress: string;
    addressee: string;
    phoneNumber: string;
    isDefault: boolean;
  };
}) => POST("/destinations", { ...data });

// PATCH /destinations/:id 배송지 수정
export const patchDestination = ({ id, data }) =>
  PATCH(`/destinations/${id}`, { data });

// PATCH /destinations/:id/default 기본배송지 수정
export const patchDefaultDestination = (id: number) =>
  PATCH(`/destinations/${id}/default`);

// DELETE /destinations/:id 배송지 삭제
export const deleteDestination = (id: number) => DELETE(`/destinations/${id}`);
