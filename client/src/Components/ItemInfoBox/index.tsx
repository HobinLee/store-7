import styled from "styled-components";
import Checkbox from "@/Components/Checkbox";
import { convertToKRW } from "@/utils/util";
import { gap } from "@/styles/theme";
import { Close } from "@/assets";
import { deleteCart, patchCart } from "@/api/carts";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { CartType } from "@/shared/type";
import { Triangle } from "@/assets";
import useInput from "@/hooks/useInput";
import Input from "../Input";
import useDebounce from "@/hooks/useDebounce";
import { SetStateAction, useEffect } from "react";
import { Dispatch } from "react";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import properties from "@/config/properties";

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
  refetch?: () => Promise<QueryObserverResult<unknown>>;
  setCartItems?: Dispatch<SetStateAction<CartType>>;
};

export const output = ({ price, deliveryCost }) => {
  return {
    priceOutput: `총 ${convertToKRW(price)}`,
    deliveryOutput: `배송비 ${convertToKRW(deliveryCost)}`,
  };
};

const LoggedInNumInput = ({
  id,
  amount,
  refetch,
  setCartItems,
}: {
  id: number;
  amount: number;
  refetch: () => Promise<QueryObserverResult<unknown>>;
  setCartItems: Dispatch<SetStateAction<CartType>>;
}) => {
  const numValue = useInput(amount.toString());
  const debouncedNumValue = useDebounce(numValue.value, 200);

  const isLoggedin = useRecoilValue(loginState);

  const handleClickNumVal = async (val: 1 | -1) => {
    let num = parseInt(numValue.value);
    if (val === 1) {
      numValue.setValue((num + 1).toString());
    } else {
      if (num > 1) numValue.setValue((num - 1).toString());
    }
  };

  const handlePatchCart = async () => {
    await patchCart(id, { amount: parseInt(debouncedNumValue) });
    refetch();
  };
  useEffect(() => {
    if (isLoggedin) handlePatchCart();
    else {
      const exist: CartType = JSON.parse(localStorage.getItem("carts"));
      const itemToUpdate = exist.items.find((i) => i.id === id);

      const itemPrice = itemToUpdate.price / itemToUpdate.amount;
      itemToUpdate.amount = parseInt(debouncedNumValue);
      itemToUpdate.price = itemPrice * parseInt(debouncedNumValue);

      localStorage.setItem("carts", JSON.stringify(exist));
      setCartItems(exist);
    }
  }, [debouncedNumValue]);

  return (
    <div className="info__num">
      <div>수량</div>
      <div className="num-input">
        <NumInput defaultValue={numValue.value} onChange={numValue.onChange} />
        <div>
          <button type="button" onClick={() => handleClickNumVal(1)}>
            <Triangle className="num-input__up" />
          </button>
          <button type="button" onClick={() => handleClickNumVal(-1)}>
            <Triangle className="num-input__down" />
          </button>
        </div>
      </div>
    </div>
  );
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
  refetch,
  setCartItems,
}: ItemInfoBoxProps) => {
  const OUTPUT = output({ ...{ amount, price, deliveryCost } });

  const isLoggedin = useRecoilValue(loginState);

  const pathname = location.pathname.split("/")[1];

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
      return <LoggedInNumInput {...{ id, amount, refetch, setCartItems }} />;
    return <div className="info__amount">{amount}개</div>;
  }, []);

  return (
    <Wrapper>
      <div className="info">
        {checkboxVisible && <Checkbox {...{ isChecked, handleCheck }} />}
        <img role="img" src={properties.imgURL + images[0]} />
        <div>
          <div className="info__name">{name}</div>
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
      margin-top: 1rem;
      ${({ theme }) => theme.flexCenter};
      ${gap("1rem")}
    }
    &__amount {
      margin-top: 3rem;
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

  .num-input {
    ${({ theme }) => theme.flexCenter}
    margin-right: 2rem;
    background: #fff;
    div {
      ${({ theme }) => theme.flexCenter}
      flex-direction: column;
      height: 2.5rem;
      button {
        ${({ theme }) => theme.flexCenter};
        cursor: pointer;
        width: 1.6rem;
        /* height: 1.6rem; */
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
`;

const NumInput = styled(Input)`
  width: 3rem;
  text-align: center;
  padding: 1rem;
`;

export default ItemInfoBox;
