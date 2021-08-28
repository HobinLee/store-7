import styled from "styled-components";
import { PageWrapper } from "@/shared/styled";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { gap, media } from "@/styles/theme";
import { useOrdersByOrderNum } from "@/api/orders";
import { useEffect } from "react";
import properties from "@/config/properties";
import { moveTo } from "@/Router";

interface OrderType {
  id: number;
  optionName: string;
  optionValue: string;
  amount: number;
  status: string;
  productName: string;
  product: {
    id: number;
    images: { id: string }[];
  };
}

const OrderResult = () => {
  const orderNum = location.pathname.split("result/")[1];
  const {
    status: ordersStatus,
    data: orders,
    error,
  } = useOrdersByOrderNum(parseInt(orderNum));

  return (
    <Wrapper>
      <Header />

      <div className="container">
        <div className="items">
          <div className="title">
            주문번호 {orderNum}
            <div className="title__sub">
              주문번호로 주문내역을 주회할 수 있습니다.
            </div>
          </div>

          {ordersStatus !== "loading" &&
            orders.map((order: OrderType) => (
              <OrderBox key={order.id}>
                <img
                  width="100"
                  src={properties.imgURL + order.product.images[0].id}
                />
                <div className="info">
                  <div
                    onClick={() => moveTo(`/detail/${order.product.id}`)}
                    className="info__name"
                  >
                    {order.productName}
                  </div>
                  <div>
                    <span className="info__option">{order.optionName}</span>
                    {order.optionValue} {order.amount}개
                  </div>
                </div>

                <div className="status">{order.status}</div>
              </OrderBox>
            ))}
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .container {
    ${({ theme }) => theme.flexCenter}
    align-items: flex-start;
  }
  .title {
    margin-top: 10rem;
    margin-bottom: 5rem;
    width: 100%;
    ${({ theme }) => theme.font.xlarge};
    &__sub {
      margin-top: 2rem;
      ${({ theme }) => theme.font.small};
    }
  }

  .items {
    /* ${({ theme }) => theme.flexCenter}; */
    display: flex;
    flex-direction: column;
    width: 90rem;
    ${gap("2rem", "column")};
    ${media.tablet} {
      width: 100%;
      padding: 0 5rem;
      box-sizing: border-box;
    }
    ${media.mobile} {
      padding: 0 2rem;
    }
  }
`;

const OrderBox = styled.div`
  ${({ theme }) => theme.font.medium};
  width: 100%;
  background: white;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  ${media.mobile} {
    padding: 1rem;
  }
  img {
    width: 7rem;
    height: 7rem;
    background-color: ${({ theme }) => theme.color.grey1};
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .info {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    ${gap("2rem")}
    &__name {
      cursor: pointer;
      ${({ theme }) => theme.font.large};
    }
    &__option {
      font-weight: 800;
      margin-right: 0.5rem;
    }
    div {
      margin: 0;
    }
  }

  .status {
    font-size: 2rem;
    font-weight: 800;
    white-space: nowrap;
  }
`;

export default OrderResult;
