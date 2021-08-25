import { DELETE, PATCH, POST } from "@/utils/axios";

// POST /questions 문의하기
export const postQuestion = (data: {
  productId: number;
  type: string;
  question: string;
  isSecret: boolean;
}) => POST("/questions", { data });

// PATCH /questions/:id 문의 수정하기
export const patchQuestion = ({ id, question }) => {
  PATCH(`/questions/${id}`, question);
};

// DELETE /questions/:id
export const deleteQuestion = ({ id }) => DELETE(`questions/${id}`);
