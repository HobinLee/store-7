import styled from "styled-components";
import { PageWrapper } from "@/shared/styled";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Button from "@/Components/Button";
import { moveTo } from "@/Router";
import { gap } from "@/styles/theme";
import { useOrdersByOrderNum } from "@/api/orders";
import { useEffect } from "react";

const OrderResult = () => {
  const orderNum = location.pathname.split("order/")[1];
  const {
    status,
    data: orders,
    error,
  } = useOrdersByOrderNum(parseInt(orderNum));

  useEffect(() => {
    if (orders) console.log(orders);
  }, [status]);

  return (
    <Wrapper>
      <Header />
      <div className="title">결제가 완료되었습니다</div>
      <div className="buttons">
        <Button primary onClick={() => moveTo("/")}>
          홈화면으로 돌아가기
        </Button>
        <Button>주문내역 확인하기</Button>
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  background: #000;
  color: #fff;
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;

  .title {
    position: relative;
    font-size: 10rem;
    &::after {
      content: "결제가 완료되었습니다";
      position: absolute;
      white-space: nowrap;
      top: 0.5rem;
      left: 0.5rem;
      color: transparent;
      -webkit-text-stroke: 0.3rem ${({ theme }) => theme.color.primary1};
      animation: blink 0.8s linear infinite;
    }
  }
  .buttons {
    margin-top: 5rem;
    display: flex;
    ${gap("2rem")}
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    30% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default OrderResult;
