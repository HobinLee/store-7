import Button from "@/Components/Common/Button";
import { useState, useCallback } from "react";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { WishIcon } from "@/assets";
import { convertToKRW } from "@/utils/util";
import { gap } from "@/styles/theme";
import { postCart } from "@/api/carts";
import { moveTo } from "@/Router";
import { CartType, ProductType } from "@/shared/type";
import { InputType } from "@/hooks/useInput";
import NumInput from "@/Components/Common/NumInput";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";

type OptionBoxProps = {
  numValue: InputType;
  handleClickNumVal: Function;
  product: ProductType;
  isMyWish: boolean;
  handleClickWish: (e: Event) => void;
};

const OptionBox = ({
  numValue,
  handleClickNumVal,
  product,
  isMyWish,
  handleClickWish,
}: OptionBoxProps) => {
  const [isCartAlertShown, setIsCartAlertShown] = useState(false);

  const productId = product.id;
  const isLoggedin = useRecoilValue(loginState);

  const RenderNumInput = useCallback(() => {
    return (
      <NumInput
        numValue={numValue}
        handleMinus={() => handleClickNumVal(-1)}
        handlePlus={() => handleClickNumVal(1)}
      />
    );
  }, [numValue.value]);

  // 상품옵션
  const [productOptionId, setProductOptionId] = useState(
    product.options[0]?.id
  );

  // 장바구니
  const handlePostCart = async () => {
    try {
      if (isLoggedin && status !== "loading") {
        await postCart({
          data: {
            product: { id: productId },
            amount: parseInt(numValue.value),
            productOptionId,
          },
        });
      } else {
        const exist: CartType = localStorage.getItem("carts")
          ? JSON.parse(localStorage.getItem("carts"))
          : {
              totalPrice: 0,
              totalPayment: 0,
              totalDelivery: 0,
              items: [],
            };

        exist.items = [
          ...exist.items,
          {
            ...product,
            id: (exist.items[exist.items.length - 1]?.id || 0) + 1,
            amount: parseInt(numValue.value),
            price: product.price * parseInt(numValue.value),
            productId: productId,
            productOptionId,
          },
        ];
        localStorage.setItem("carts", JSON.stringify(exist));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCartAlertShown(true);
    }
  };
  const renderWishIcon = useCallback(() => {
    return (
      <WishIcon
        onClick={handleClickWish}
        className={isMyWish ? "is-wish" : "not-wish"}
      />
    );
  }, [isMyWish]);
  // 바로구매
  const handleBuyImmediately = () => {
    localStorage.setItem(
      "orders",
      JSON.stringify({
        items: [
          {
            ...product,
            amount: numValue.value,
            price: product.price * parseInt(numValue.value),
            productId,
            productOptionId,
          },
        ],
        totalPrice: product.price * parseInt(numValue.value),
        totalDelivery: product.deliveryCost,
        totalPayment:
          product.price * parseInt(numValue.value) + product.deliveryCost,
        totalCount: parseInt(numValue.value),
      })
    );
    moveTo("/order");
  };

  return (
    <>
      <Wrapper>
        {/* 상품수량 */}
        <div className="select-option">
          <div>수량</div>
          <div className="select-option__right">
            <div>
              <RenderNumInput />
            </div>
            {convertToKRW(product.price)}
          </div>
        </div>

        {/* 상품옵션 */}
        <div className="select-option option">
          {product.option && (
            <>
              <div>{product.option}</div>
              <div className="select-option__right">
                <select
                  onChange={(e) => {
                    setProductOptionId(parseInt(e.target.value));
                  }}
                  value={productOptionId}
                >
                  {product.options.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                      disabled={option.stock < 1}
                    >
                      {option.value} (재고: {option.stock}개)
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="total-price">
          <div>총 합계금액</div>
          {convertToKRW(product.price * parseInt(numValue.value))}
        </div>

        <div className="buttons">
          <div>{renderWishIcon()}</div>
          {product.stock ? (
            <div className="buttons__be-stock">
              <Button onClick={handlePostCart}>장바구니</Button>
              <Button onClick={handleBuyImmediately} primary>
                바로 구매
              </Button>
            </div>
          ) : (
            <Button disabled className="buttons__sold-out">
              품절된 상품입니다.
            </Button>
          )}
        </div>
      </Wrapper>
      {isCartAlertShown && (
        <Alert
          title="장바구니에 상품을 담았습니다"
          className="alert"
          hideCloseBtn
        >
          <>
            <Button
              className="alert-button"
              primary
              onClick={() => (window.location.href = "/cart")}
              size="large"
            >
              장바구니 보러가기
            </Button>
            <Button
              className="alert-button"
              onClick={() => setIsCartAlertShown(false)}
              size="large"
            >
              쇼핑 계속하기
            </Button>
          </>
        </Alert>
      )}
    </>
  );
};

export default OptionBox;

const Wrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 23.5rem;
  width: 35rem;
  padding: 2rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2rem;

  .select-option {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.medium}
    justify-content: space-around;
    background: ${({ theme }) => theme.color.background};
    width: 100%;
    padding: 1.5rem 0;
    border-radius: 1rem;
    &.option {
      background: #fff;
    }
    &__right {
      ${({ theme }) => theme.flexCenter};
      justify-content: space-between;
      width: 18rem;

      select {
        cursor: pointer;
        width: 100%;
        border: 0.1rem solid ${({ theme }) => theme.color.line};
        padding: 0.8rem 1rem;
        border-radius: 0.5rem;
      }
    }
  }
  .total-price {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.xlarge}
    justify-content: space-between;
    padding: 2.25rem 0;
    border-top: 0.1rem solid ${({ theme }) => theme.color.line};
    width: 100%;
    color: ${({ theme }) => theme.color.primary1};
    & > * {
      ${({ theme }) => theme.font.medium}
      color: ${({ theme }) => theme.color.title_active};
    }
  }
  .buttons {
    ${({ theme }) => theme.flexCenter}
    width: 100%;
    justify-content: flex-end;
    ${gap("1rem")}
    .is-wish {
      cursor: pointer;
      fill: ${({ theme }) => theme.color.primary1};
      &:hover {
      }
    }

    .not-wish {
      cursor: pointer;
      stroke: ${({ theme }) => theme.color.primary1};
      fill: transparent;
      stroke-width: 2rem;
    }
    &__be-stock {
      display: flex;
      justify-content: flex-end;
      ${gap("1rem")}
    }
    &__sold-out {
      background: ${({ theme }) => theme.color.light_grey1};
      height: 100%;
    }
  }
`;

const Alert = styled(ModalWrapper)`
  width: 30rem;
  .alert-button {
    margin-top: 1.5rem;
  }
`;
