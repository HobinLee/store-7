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
