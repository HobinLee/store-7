<<<<<<< HEAD
import { ETLink } from "@/Router";
=======
>>>>>>> chore: 각종 Row 컴포넌트
import React from "react";

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
<<<<<<< HEAD
      <td>
        <ETLink to={`/mypage/review/${id}`}>{title}</ETLink>
      </td>
=======
      <td>{title}</td>
>>>>>>> chore: 각종 Row 컴포넌트
      <td>{date}</td>
      <td>{author}</td>
    </tr>
  );
};

export default ReviewRow;
