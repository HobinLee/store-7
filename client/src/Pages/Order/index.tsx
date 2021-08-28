import { PageWrapper } from "@/shared/styled";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { gap, media } from "@/styles/theme";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import { useCallback } from "react";
import LoggedinContent from "./OrderContent/LoggedinContent";
import LoggedoutContent from "./OrderContent/LoggedoutContent";
import { postPaymentReady } from "@/api/payment";
import properties from "@/config/properties";
import { DestinationType, ICart, PartialCart } from "@/shared/type";
import { postOrder, postOrderNum } from "@/api/orders";
import { InputType } from "@/hooks/useInput";
import { moveTo } from "@/Router";

// 카카오페이
export const handleKakaoPay = async (
  handlePostOrder: Function,
  items: Partial<ICart>[]
) => {
  const res = await postPaymentReady({
    cid: "TC0ONETIME",
    item_name:
      items.length === 1
        ? items[0].name
        : `${items[0].name}외 ${items.length - 1}개`,
    quantity: items.length,
    total_amount: items.reduce((sum, cart) => sum + cart.price, 0),
    tax_free_amount: 0,
    approval_url: `${properties.baseURL}/payment/approve`,
    cancel_url: properties.baseURL,
    fail_url: properties.baseURL,
  });
  if (res) {
    try {
      handlePostOrder();
    } finally {
      window.open(res.url);
    }
  }
};

// create order
export const handlePostOrder = (
  orderItems: {
    items: PartialCart[];
  },
  destination: Partial<DestinationType>,
  addressee: InputType,
  request: string
) => {
  const orderIds = [];

  orderItems.items.forEach(async (item) => {
    const id = await postOrder({
      data: {
        productId: item.productId,
        addressee: addressee.value,
        productOptionId: item.productOptionId,
        price: item.price,
        amount: item.amount,
        destination: `${destination.address} ${destination.detailAddress}`,
        request: request,
      },
    });

    orderIds.push(id);

    const date = new Date();
    const orderNum = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${
      orderIds[0]
    }`;

    orderIds.forEach(async (id) => {
      await postOrderNum(id, orderNum);
    });

    moveTo(`/result/${orderNum}`);
  });
};

const OrderPage = () => {
  const isLoggedin = useRecoilValue(loginState);

  const RenderContent = useCallback(() => {
    if (isLoggedin) return <LoggedinContent />;
    return <LoggedoutContent />;
  }, [isLoggedin]);

  return (
    <>
      <Header />
      <Wrapper>
        <RenderContent />
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    padding: 0 10rem;
    ${media.tablet} {
      padding: 0 5rem;
    }
    ${media.mobile} {
      padding-top: 3rem;
    }
  }
  select {
    cursor: pointer;
  }
  .order-input {
    width: 37rem;
    border: 0.1rem solid ${({ theme }) => theme.color.line};
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
  }
  .info-input {
    ${({ theme }) => theme.flexCenter};
    justify-content: start;
    :not(:first-child) {
      margin-top: 2rem;
    }
    label {
      width: 7rem;
    }
  }
`;

export const Title = styled.div`
  width: 100%;
  ${({ theme }) => theme.font.xlarge}
  .other {
    color: ${({ theme }) => theme.color.grey2};
  }
  .arrow {
    ${media.mobile} {
      height: 2.3rem;
    }
  }
`;

export const Content = styled.div`
  box-sizing: border-box;
  padding-right: 43rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${gap("8rem", "column")}
  margin: 4rem 0;
  ${media.tablet} {
    padding-right: 0;
  }
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${gap("2rem", "column")}
  .label {
    ${({ theme }) => theme.flexCenter};
    ${({ theme }) => theme.font.large};
    width: 100%;
    justify-content: space-between;
    padding-bottom: 2rem;
    margin: 2rem 0;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${gap("3rem", "column")}
    width: 30rem;
  }
  div {
    ${({ theme }) => theme.font.medium};
  }
  .items {
    display: flex;
    flex-direction: column;
    width: 100%;
    ${gap("2rem", "column")}
  }
  .address-info {
    display: flex;
    flex-direction: column;
    ${gap("1rem", "column")}
    .name {
      ${({ theme }) => theme.font.large};
    }
  }
  .address-btn {
    cursor: pointer;
    :hover {
      font-weight: bolder;
      color: ${({ theme }) => theme.color.primary1};
    }
  }
  .payments {
    display: flex;
    ${gap("1rem")}
    &__item {
      background: #fff;
    }
  }
`;

export const Payment = styled.div<{ isClicked: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  border: 0.2rem solid
    ${({ theme, isClicked }) =>
      isClicked ? theme.color.primary1 : theme.color.line};
`;

export default OrderPage;
