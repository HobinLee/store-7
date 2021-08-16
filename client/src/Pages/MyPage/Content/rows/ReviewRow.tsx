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
      <td>{title}</td>
      <td>{date}</td>
      <td>{author}</td>
    </tr>
  );
};

export default ReviewRow;
