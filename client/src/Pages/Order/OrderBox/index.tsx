import styled from "styled-components";
import Button from "@/Components/Button";
import { convertToKRW } from "@/utils/util";

export type OrderBoxProps = {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  totalCount: number;
};

export const output = (props: OrderBoxProps) => {
  return {
    priceOutput: convertToKRW(props.totalPrice),
    deliveryOutput: convertToKRW(props.totalDelivery),
    paymentOutput: convertToKRW(props.totalPayment),
    countOutput: `${props.totalCount}개 상품 구매하기`,
  };
};

const OrderBox = ({
  totalPrice,
  totalDelivery,
  totalPayment,
  totalCount,
}: OrderBoxProps) => {
  const OUTPUT = output({
    totalPrice,
    totalDelivery,
    totalPayment,
    totalCount,
  });

  return (
    <Wrapper>
      <Result>
        <div>
          <div>총 상품금액</div>
          <div className="value">{OUTPUT.priceOutput}</div>
        </div>
        <div>
          <div>총 배송비</div>
          <div className="value">{OUTPUT.deliveryOutput}</div>
        </div>
        <div className="result">
          <div>결제금액</div>
          <div className="value">{OUTPUT.paymentOutput}</div>
        </div>
      </Result>

      <Button
        className="order-btn"
        primary
        size="large"
        onClick={() => (window.location.href = "/order")}
      >
        <span>{OUTPUT.countOutput}</span>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 1rem;
  padding: 3rem;
  .order-btn {
    margin-top: 2rem;
  }
`;

const Result = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.medium};
  flex-direction: column;
  background: ${({ theme }) => theme.color.background};
  border-radius: 1rem;
  padding: 3rem 2rem;
  gap: 2rem;
  width: 40rem;
  & > div {
    ${({ theme }) => theme.flexCenter};
    width: 100%;
    justify-content: space-between;
  }
  .value {
    font-weight: 900;
  }
  .result {
    ${({ theme }) => theme.font.large};
    margin-top: 2rem;
    .value {
      color: ${({ theme }) => theme.color.primary1};
      font-size: 3rem;
    }
  }
`;

export default OrderBox;
