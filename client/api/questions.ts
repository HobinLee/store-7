import { DELETE, PATCH, POST } from "@/utils/axios";

// POST /questions 문의하기
export const postQuestion = ({ data }) => POST("/questions", data);

// PATCH /questions/:id 문의 수정하기
export const patchQuestion = ({ id }) => PATCH(`/questions/${id}`);

// DELETE /questions/:id
export const deleteQuestion = ({ id }) => DELETE(`questions/${id}`);
