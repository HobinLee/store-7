import React from "react";

type QuestionRowType = {
  id: number;
  date: "20210813";
  category: "기타";
  title: "2주밖에 안 남았어요.";
  status: "답변완료";
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
      <td>{title}</td>
      <td>{status}</td>
    </tr>
  );
};

export default QuestionRow;
