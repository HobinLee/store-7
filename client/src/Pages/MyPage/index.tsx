import { useState } from "react";
import styled from "styled-components";

import { PageWrapper, Contents } from "@/shared/styled";
import Header from "@/Components/Header";
import Nav from "./Nav";
import ContentArea from "./ContentArea";

import { useMyInfo } from "@/api/my";

const MyPage = () => {
  const [current, setCurrent] = useState("/");

  return (
    <MyPageWrapper>
      <Header />
      <Contents>
        <ContentHeader setCurrent={setCurrent} current={current} />
        <ContentBody>
          <ContentArea current={current} />
        </ContentBody>
      </Contents>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled(PageWrapper)``;
const ContentBody = styled.div`
  width: 100%;
  display: flex;
`;

const ContentHeader = ({ setCurrent, current }) => {
  return (
    <ContentHeaderWrapper>
      <Greeting />
      <Nav setCurrent={setCurrent} current={current} />
    </ContentHeaderWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5rem;
`;

export const Greeting = () => {
  const { status, data: userInfo } = useMyInfo();
  return (
    <GreetingWrapper data-testid="test__content-header">
      {status !== "loading" ? (
        <>
          <div className="greeting">반가워요,</div>
          <p>
            <span>{userInfo.name}</span> 님의
          </p>
          <p>
            회원등급은 <span>{userInfo.grade}</span>입니다.
          </p>{" "}
        </>
      ) : (
        <div>스켈레톤 UI</div>
      )}
    </GreetingWrapper>
  );
};

const GreetingWrapper = styled.div`
  margin-right: 10em;
  .greeting {
    font-size: 4rem;
    font-weight: bold;
    margin: 2.5rem 0;
  }

  p {
    font-size: 1.7rem;
    line-height: 1.7rem;
    span {
      ${({ theme }) => theme.font.large}
    }
  }

  p + p {
    margin-top: 1rem;
  }
`;

export default MyPage;
