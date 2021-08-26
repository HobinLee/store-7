import styled from "styled-components";
import { patchCart } from "@/api/carts";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { CartType, ProductOptionType } from "@/shared/type";
import { Triangle } from "@/assets";
import useInput from "@/hooks/useInput";
import Input from "../Input";
import useDebounce from "@/hooks/useDebounce";
import { SetStateAction, useEffect } from "react";
import { Dispatch } from "react";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import { useState } from "react";
import { media } from "@/styles/theme";

interface CartSelectsProps {
  id: number;
  amount: number;
  refetch: () => Promise<QueryObserverResult<unknown>>;
  setCartItems: Dispatch<SetStateAction<CartType>>;
  option?: string;
  options?: ProductOptionType[];
  productOptionId?: number;
}

const CartSelects = ({
  id,
  amount,
  refetch,
  setCartItems,
  option,
  options,
  productOptionId,
}: CartSelectsProps) => {
  const numValue = useInput(amount.toString());
  const debouncedNumValue = useDebounce<string>(numValue.value, 200);

  const isLoggedin = useRecoilValue(loginState);

  const handleClickNumVal = async (val: 1 | -1) => {
    let num = parseInt(numValue.value);
    if (val === 1) {
      numValue.setValue((num + 1).toString());
    } else {
      if (num > 1) numValue.setValue((num - 1).toString());
    }
  };

  // 상품옵션
  const [optionId, setOptionId] = useState(productOptionId);

  const handlePatchCart = async () => {
    await patchCart(id, {
      amount: parseInt(debouncedNumValue),
      productOptionId: optionId,
    });
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
      itemToUpdate.productOptionId = optionId;

      localStorage.setItem("carts", JSON.stringify(exist));
      setCartItems(exist);
    }
  }, [debouncedNumValue, optionId]);

  const RenderNumInput = useCallback(() => {
    return (
      <NumInput defaultValue={numValue.value} onChange={numValue.onChange} />
    );
  }, [numValue.value]);

  return (
    <Wrapper>
      {/* 수량 */}
      <div className="info__num">
        <div>수량</div>
        <div className="num-input">
          <RenderNumInput />
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

      {/* 옵션 */}
      {productOptionId && (
        <div className="select-option">
          <div>{option}</div>
          <select
            onChange={(e) => {
              setOptionId(parseInt(e.target.value));
            }}
            defaultValue={optionId}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value} (재고: {option.stock}개)
              </option>
            ))}
          </select>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 1.5rem 0;
  align-items: center;
  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
    select {
      width: 100%;
      text-overflow: ellipsis;
    }
  }
  div {
    white-space: nowrap;
  }
`;

const NumInput = styled(Input)`
  width: 3rem;
  text-align: center;
  padding: 1rem;
`;

export default CartSelects;
