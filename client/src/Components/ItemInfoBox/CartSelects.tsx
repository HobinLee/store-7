import styled from "styled-components";
import { patchCart } from "@/api/carts";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { CartType, ProductOptionType } from "@/shared/type";
import useInput from "@/hooks/useInput";
import useDebounce from "@/hooks/useDebounce";
import { SetStateAction, useEffect } from "react";
import { Dispatch } from "react";
import { useCallback } from "react";
import { QueryObserverResult } from "react-query";
import { useState } from "react";
import { media, gap } from "@/styles/theme";
import NumInput from "@/Components/Common/NumInput";

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
      <NumInput
        numValue={numValue}
        handleMinus={() => handleClickNumVal(-1)}
        handlePlus={() => handleClickNumVal(1)}
      />
    );
  }, [numValue.value]);

  return (
    <Wrapper>
      {/* 수량 */}
      <div className="amount">
        <div>수량</div>
        <RenderNumInput />
      </div>

      {/* 옵션 */}
      {productOptionId && (
        <div className="select-option">
          <div>{option}</div>
          <select
            onChange={(e) => {
              setOptionId(parseInt(e.target.value));
            }}
            value={optionId}
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
  .amount {
    ${({ theme }) => theme.flexCenter};
    ${gap("2rem")}
  }
  .num-input {
    background: ${({ theme }) => theme.color.background};
  }
`;

export default CartSelects;
