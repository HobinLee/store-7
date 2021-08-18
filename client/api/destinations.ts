import { DELETE, PATCH, POST } from "@/utils/axios";

// POST /destinations 배송지 추가
export const postDestinations = ({ data }) => POST("/destinations", data);

// PATCH /destinations/:id 배송지 수정
export const patchDestination = ({ id, data }) =>
  PATCH(`/destination/${id}`, data);

// DELETE /destinations/:id 배송지 삭제
export const deleteDestination = ({ id }: { id: number }) =>
  DELETE(`/destination/${id}`);
