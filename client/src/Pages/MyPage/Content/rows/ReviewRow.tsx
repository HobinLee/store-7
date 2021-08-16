import React from "react";
import { ETLink } from "@/Router";

type ReviewRowType = {
  id: number;
  number: number;
  title: string;
  date: string;
  author: string;
};

const ReviewRow = ({ id, number, date, title, author }: ReviewRowType) => {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <ETLink to={`/mypage/review/${id}`}>{title}</ETLink>
      </td>
      <td>{date}</td>
      <td>{author}</td>
    </tr>
  );
};

export default ReviewRow;
