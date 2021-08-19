import { useState } from "react";
import styled from "styled-components";

import { PageWrapper, Contents } from "@/shared/styled";
import Header from "@/Components/Header";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";

const MyPage = () => {
  const [current, setCurrent] = useState("/");
  const user: User = {
    username: "홍영준",
    grade: "쭈굴회원",
  };

  return (
    <MyPageWrapper>
      <Header />
      <Contents>
        <ContentHeader {...user} />
        <ContentBody>
          <Sidebar setCurrent={setCurrent} />
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

export interface User {
  username: string;
  grade: string;
}

export const ContentHeader = ({ username, grade }: User) => {
  return (
    <ContentHeaderWrapper data-testid="test__content-header">
      <div className="greeting">반가워요,</div>
      <p>
        <span>{username}</span> 님의
      </p>
      <p>
        회원등급은 <span>{grade}</span>입니다.
      </p>
    </ContentHeaderWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 8rem;

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
