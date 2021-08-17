import styled from "styled-components";
import Checkbox from "@/Components/Checkbox";
import { convertToKRW } from "@/utils/util";
import { gap } from "@/styles/theme";

export type ItemInfoBoxProps = {
  name: string;
  num: number;
  price: number;
  delivery: number;
  thumbnail?: string;
};

export const output = ({ num, price, delivery }) => {
  return {
    numOutput: `${num}개`,
    priceOutput: `총 ${convertToKRW(price)}`,
    deliveryOutput: `배송비 ${convertToKRW(delivery)}`,
  };
};

const ItemInfoBox = ({
  name,
  num,
  price,
  delivery,
  thumbnail = "",
}: ItemInfoBoxProps) => {
  const OUTPUT = output({ ...{ num, price, delivery } });

  return (
    <Wrapper>
      <div className="info">
        <Checkbox />
        <img role="img" src={thumbnail} />
        <div>
          <div className="info__name">{name}</div>
          <div className="info__num">{OUTPUT.numOutput}</div>
        </div>
      </div>

      <div className="price">
        <div>{OUTPUT.priceOutput}</div>
        <div>{OUTPUT.deliveryOutput}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.font.medium};
  width: 100%;
  background-color: ${({ theme }) => theme.color.background};
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  .info {
    display: flex;
    align-items: flex-start;
    ${gap("2rem")}
    &__name {
      ${({ theme }) => theme.font.large};
    }
    &__num {
      margin-top: 2rem;
    }
  }
  img {
    width: 7rem;
    height: 7rem;
    background-color: ${({ theme }) => theme.color.grey1};
  }
  .price {
    ${({ theme }) => theme.flexCenter};
    font-weight: 700;
    justify-content: flex-end;
    ${gap("2rem")}
  }
`;

export default ItemInfoBox;
