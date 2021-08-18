import styled from "styled-components";

import forms from "@/Pages/MyPage/Table/forms";

export interface RecentOrderProps {
  id: number;
  date: Date;
  number: string;
  image: string;
  name: string;
  price: number;
  status: string;
  count: number;
  reviewID: number;
}

const RecentOrder = ({
  id,
  date,
  number,
  image,
  name,
  price,
  count,
  status,
  reviewID,
}: RecentOrderProps) => {
  const statusStyle = status === "completed" ? { color: "#2ac1bc" } : {};
  const statusStr = {
    shipping: "배송 중",
    completed: "배송 완료",
    return: "교환/환불 중",
  };

  return (
    <tr>
      <td>
        <forms.Order orderDate={date} orderNumber={number} />
      </td>
      <td>
        <forms.ProductOption image={image} name={name} id={id} />
      </td>
      <td>
        {price} / {count}
      </td>
      <td style={statusStyle}>{statusStr[status]}</td>
      <td>{reviewID ? "작성완료" : <ReviewBox />}</td>
    </tr>
  );
};

const ReviewBox = () => {
  return (
    <ReviewBoxWrapper>
      <div>미작성</div>
      <button>작성하기</button>
    </ReviewBoxWrapper>
  );
};

const ReviewBoxWrapper = styled.div`
  & > button {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 0;
    background: black;
    color: white;
    cursor: pointer;
    ${({ theme }) => theme.borderRadius.small};
  }
`;

export default RecentOrder;
