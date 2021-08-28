import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "@/Components/Footer";
import { PageWrapper, Contents } from "@/shared/styled";
import Header from "@/Components/Header";
import Nav from "./Nav";
import ContentArea from "./ContentArea";

import { useMyInfo } from "@/api/my";
import { locationState } from "@/store/history";
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const { location } = useRecoilValue(locationState);
  const [current, setCurrent] = useState("order");

  useEffect(() => {
    const sub = location.split("mypage/")[1];
    setCurrent(sub || "order");
  }, [location]);

  return (
    <>
      <Header />
      <MyPageWrapper>
        <Contents>
          <ContentHeader setCurrent={setCurrent} current={current} />
          <ContentBody>
            <ContentArea current={current} />
          </ContentBody>
        </Contents>
        <Footer />
      </MyPageWrapper>
    </>
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

export const Greeting = () => {
  const { status, data: myInfo } = useMyInfo();
  return (
    <GreetingWrapper data-testid="test__content-header">
      {status !== "loading" ? (
        <>
          <div className="greeting">반가워요,</div>
          <p>
            <span>{myInfo.name}</span> 님의
          </p>
          <p>
            회원등급은 <span>{myInfo.grade}</span>입니다.
          </p>{" "}
        </>
      ) : (
        <div>스켈레톤 UI</div>
      )}
    </GreetingWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10rem;
`;

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
