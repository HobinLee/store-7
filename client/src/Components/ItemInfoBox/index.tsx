import styled from "styled-components";
import Checkbox from "@/Components/Checkbox";
import { convertToKRW } from "@/utils/util";
import { gap, media } from "@/styles/theme";
import { Close } from "@/assets";
import { deleteCart } from "@/api/carts";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { CartType, ProductOptionType } from "@/shared/type";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import properties from "@/config/properties";
import CartSelects from "./CartSelects";
import { moveTo } from "@/Router";

export type ItemInfoBoxProps = {
  id: number;
  name: string;
  amount: number;
  productId: number;
  productOptionId?: number;
  option?: string;
  options?: ProductOptionType[];
  price: number;
  deliveryCost: number;
  images?: string[];
  isChecked?: boolean;
  handleCheck?: Function;
  checkboxVisible?: boolean;
  refetch?: () => Promise<QueryObserverResult<unknown>>;
  setCartItems?: Dispatch<SetStateAction<CartType>>;
};

export const output = ({ price, deliveryCost }) => {
  return {
    priceOutput: `총 ${convertToKRW(price)}`,
    deliveryOutput: `배송비 ${
      deliveryCost === 0 ? "무료" : convertToKRW(deliveryCost)
    }`,
  };
};

const ItemInfoBox = ({
  id,
  name,
  amount,
  productId,
  productOptionId,
  option,
  options,
  price,
  deliveryCost,
  images,
  isChecked,
  handleCheck,
  checkboxVisible = false,
  refetch,
  setCartItems,
}: ItemInfoBoxProps) => {
  const OUTPUT = output({ ...{ amount, price, deliveryCost } });

  const isLoggedin = useRecoilValue(loginState);

  const pathname = location.pathname.split("/")[1];

  const optionValue =
    options?.find((i) => i.id === productOptionId)?.value || "";

  const handleDeleteCart = async () => {
    try {
      if (isLoggedin) deleteCart(id);
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

  const RenderNumInput = useCallback(() => {
    if (pathname === "cart")
      return (
        <CartSelects
          {...{
            id,
            amount,
            refetch,
            setCartItems,
            option,
            options,
            productOptionId,
          }}
        />
      );
    return (
      <div className="info__amount">
        {optionValue} {amount}개
      </div>
    );
  }, []);

  return (
    <Wrapper>
      <div className="info">
        {checkboxVisible && <Checkbox {...{ isChecked, handleCheck }} />}
        <img role="img" src={properties.imgURL + images[0]} />
        <div className="info__content">
          <div
            onClick={() => moveTo(`/detail/${productId}`)}
            className="info__name"
          >
            {name}
          </div>
          <RenderNumInput />
        </div>
      </div>

      <div className="price">
        <div>{OUTPUT.priceOutput}</div>
        <div>{OUTPUT.deliveryOutput}</div>
      </div>

      {checkboxVisible && (
        <Close onClick={handleDeleteCart} className="close-btn" />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.font.medium};
  width: 100%;
  background: white;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  position: relative;
  ${media.mobile} {
    padding: 1rem;
  }
  .info {
    display: flex;
    align-items: flex-start;
    width: 100%;
    ${gap("2rem")}
    &__content {
      width: 100%;
    }
    &__name {
      cursor: pointer;
      ${({ theme }) => theme.font.large};
      ${media.mobile} {
        padding-right: 3rem;
        line-height: 2.5rem;
      }
    }
    &__num {
      display: flex;
      align-items: center;
      ${gap("1rem")};
    }
    &__amount {
      margin-top: 3rem;
    }
    ${media.mobile} {
      ${gap("1rem")}
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
    justify-content: flex-end;
    ${gap("2rem")};
    ${media.mobile} {
      margin-top: 2rem;
    }
    div {
      font-weight: 700;
    }
  }
  .close-btn {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    fill: ${({ theme }) => theme.color.primary1};
  }

  .num-input {
    ${({ theme }) => theme.flexCenter}
    margin-right: 2rem;
    input {
      background: ${({ theme }) => theme.color.background};
    }
    div {
      ${({ theme }) => theme.flexCenter}
      flex-direction: column;
      height: 2.5rem;

      button {
        ${({ theme }) => theme.flexCenter};
        cursor: pointer;
        width: 1.6rem;
        border: none;
        padding: 0.4rem;
        background: ${({ theme }) => theme.color.primary2};
      }
    }
    &__up {
      transform: rotate(-90deg);
      fill: white;
      height: 1.1rem;
    }
    &__down {
      transform: rotate(90deg);
      fill: white;
      height: 1.2rem;
    }
  }
  .select-option {
    ${({ theme }) => theme.flexCenter};
    ${({ theme }) => theme.font.medium};
    justify-content: start;
    ${gap("1rem")};
    select {
      cursor: pointer;
      border: 0.1rem solid ${({ theme }) => theme.color.line};
      padding: 0.8rem 1rem;
      border-radius: 0.5rem;
    }
    ${media.mobile} {
      margin-top: 1rem;
    }
  }
`;

export default ItemInfoBox;
