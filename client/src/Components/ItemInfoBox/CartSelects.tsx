import styled from "styled-components";
import { patchCart } from "@/api/carts";
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

const CartSelects = ({
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

  const RenderNumInput = useCallback(() => {
    return (
      <NumInput defaultValue={numValue.value} onChange={numValue.onChange} />
    );
  }, [numValue.value]);

  return (
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
  );
};

const NumInput = styled(Input)`
  width: 3rem;
  text-align: center;
  padding: 1rem;
`;

export default CartSelects;
