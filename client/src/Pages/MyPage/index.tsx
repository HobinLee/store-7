import React, { useState } from "react";
import styled from "styled-components";

import { PageWrapper, Contents, ItemList } from "@/shared/styled";
import Header from "@/Components/Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const MyPage = () => {
  const [viewType, setViewType] = useState();

  return (
    <MyPageWrapper>
      <Header />
      <Contents>
        <ContentHeader />
        <ContentBody>
          <Sidebar />
          <Content />
        </ContentBody>
      </Contents>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled(PageWrapper)``;

const ContentHeader = () => {
  return (
    <ContentHeaderWrapper>
      <div className="greeting">반가워요,</div>
      <p>
        <span>홍영준</span> 님의
      </p>
      <p>
        회원등급은 <span>일반회원</span>입니다.
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

const ContentBody = styled.div`
  display: flex;
`;

export default MyPage;
