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
import { media } from "@/styles/theme";
import { loginState } from "@/store/state";
import { moveTo } from "@/Router";

const MyPage = () => {
  const { location } = useRecoilValue(locationState);
  const isLoggedIn = useRecoilValue(loginState);
  const [current, setCurrent] = useState("order");
  useEffect(() => {
    if (!isLoggedIn) moveTo("/login");
  }, []);

  useEffect(() => {
    const sub = location.split("mypage/")[1];
    setCurrent(sub || "order");
  }, [location]);

  return (
    isLoggedIn && (
      <>
        <Header />
        <MyPageWrapper>
          <Contents>
            <ContentHeader current={current} />
            <ContentBody>
              <ContentArea current={current} />
            </ContentBody>
          </Contents>
          <Footer />
        </MyPageWrapper>
      </>
    )
  );
};

const MyPageWrapper = styled(PageWrapper)``;
const ContentBody = styled.div`
  width: 100%;
  display: flex;
`;

const ContentHeader = ({ current }) => {
  return (
    <ContentHeaderWrapper>
      <div className="mobile__none">
        <Greeting />
      </div>
      <Nav current={current} />
    </ContentHeaderWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10rem;
  ${media.tablet} {
    flex-direction: column;
  }
  ${media.mobile} {
    margin-bottom: 5rem;
    flex-direction: column;
  }
`;

export const Greeting = () => {
  const { status, data: myInfo } = useMyInfo();
  return (
    <GreetingWrapper data-testid="test__content-header">
      {status !== "loading" ? (
        <>
          <div className="mobile__none">
            <div className="greeting">반가워요,</div>
            <div className="info">
              <p>
                <strong>{myInfo.name}</strong>님의
              </p>
              <p>
                회원등급은 <strong>{myInfo.grade}</strong>입니다.
              </p>
            </div>
          </div>
          <div className="mobile__only">
            {myInfo.name} / {myInfo.grade}
          </div>
        </>
      ) : (
        <div>스켈레톤 UI</div>
      )}
    </GreetingWrapper>
  );
};

const GreetingWrapper = styled.div`
  margin-right: 10rem;

  .greeting {
    font-size: 4rem;
    font-weight: bold;
    margin: 2.5rem 0;
  }

  .info {
    p {
      font-size: 1.7rem;
      line-height: 1.7rem;
      strong {
        ${({ theme }) => theme.font.large}
      }
    }

    p + p {
      margin-top: 1rem;
    }
  }

  ${media.tablet} {
    margin-right: 0;
    display: flex;
    align-items: center;
    .info {
      flex: 1;
      display: flex;
      margin-left: 2rem;
      p + p {
        margin-top: 0;
        margin-left: 1rem;
      }
    }
  }
  ${media.mobile} {
    & > div {
      ${({ theme }) => theme.font.medium}
    }
  }
`;

export default MyPage;
