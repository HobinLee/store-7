import React from "react";
import { ETLink } from "@/Router";

type QuestionRowType = {
  id: number;
  date: string;
  category: string;
  title: string;
  status: string;
};

const QuestionRow = ({
  id,
  date,
  category,
  title,
  status,
}: QuestionRowType) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{category}</td>
      <td>
        <ETLink to={`/mypage/question/${id}`}>{title}</ETLink>
      </td>
      <td>{status}</td>
    </tr>
  );
};

export default QuestionRow;
