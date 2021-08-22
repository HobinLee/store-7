import styled from "styled-components";
import Checkbox from "@/Components/Checkbox";
import { convertToKRW } from "@/utils/util";
import { gap } from "@/styles/theme";
import { Close } from "@/assets";
import { deleteCart } from "@/api/carts";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { CartType } from "@/shared/type";

export type ItemInfoBoxProps = {
  id: number;
  name: string;
  amount: number;
  price: number;
  deliveryCost: number;
  images?: string[];
  isChecked?: boolean;
  handleCheck?: Function;
  checkboxVisible?: boolean;
};

export const output = ({ amount, price, deliveryCost }) => {
  return {
    numOutput: `${amount}개`,
    priceOutput: `총 ${convertToKRW(price)}`,
    deliveryOutput: `배송비 ${convertToKRW(deliveryCost)}`,
  };
};

const ItemInfoBox = ({
  id,
  name,
  amount,
  price,
  deliveryCost,
  images,
  isChecked,
  handleCheck,
  checkboxVisible = false,
}: ItemInfoBoxProps) => {
  const OUTPUT = output({ ...{ amount, price, deliveryCost } });

  const isLogined = useRecoilValue(loginState);

  const handleDeleteCart = async (id: number) => {
    try {
      if (isLogined) deleteCart(id);
      else {
        const exist: CartType = JSON.parse(localStorage.getItem("carts"));
        const itemIdxToDelete = exist.items.findIndex((i) => i.id === id);

        exist.items.splice(itemIdxToDelete, 1);

        localStorage.setItem("carts", JSON.stringify(exist));
      }
    } catch (error) {
      console.log(error);
    }
    location.reload();
  };

  return (
    <Wrapper>
      <div className="info">
        {checkboxVisible && <Checkbox {...{ isChecked, handleCheck }} />}
        <img role="img" src={process.env.IMG_URL + images[0]} />
        <div>
          <div className="info__name">{name}</div>
          <div className="info__num">{OUTPUT.numOutput}</div>
        </div>
      </div>

      <div className="price">
        <div>{OUTPUT.priceOutput}</div>
        <div>{OUTPUT.deliveryOutput}</div>
      </div>

      {checkboxVisible && (
        <Close onClick={() => handleDeleteCart(id)} className="close-btn" />
      )}
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
  position: relative;
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
    object-fit: cover;
    border-radius: 0.5rem;
  }
  .price {
    ${({ theme }) => theme.flexCenter};
    font-weight: 700;
    justify-content: flex-end;
    ${gap("2rem")}
  }
  .close-btn {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    fill: ${({ theme }) => theme.color.primary1};
  }
`;

export default ItemInfoBox;
