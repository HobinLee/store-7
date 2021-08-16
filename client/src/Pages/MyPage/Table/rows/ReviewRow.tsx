import React, { useState } from "react";
import { ReviewType } from "@/shared/type";
import dayjs from "dayjs";
import ReviewBox from "@/Pages/Detail/Review/ReviewBox";
import styled from "styled-components";

const ReviewRow = (review: ReviewType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Wrapper
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <td>{1}</td>
        <td className="content">
          <div>{review.content}</div>
        </td>
        <td>{dayjs(review.date).format("YYYYMMDD")}</td>
      </Wrapper>
      {isOpen && (
        <tr>
          <td colSpan={3}>
            <ReviewBox {...review} />
          </td>
        </tr>
      )}
    </>
  );
};

const Wrapper = styled.tr`
  cursor: pointer;
  .content > div {
    ${({ theme }) => theme.font.medium};
    line-height: 1.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export default ReviewRow;
