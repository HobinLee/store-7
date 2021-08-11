import Header from "@/Components/Header";
import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Table from "./Table";
import { DUMMY } from "./dummy";

const MyPage = () => {
  return (
    <MyPageWrapper>
      <Header />
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader />
          <ContentBody />
        </Content>
      </Container>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled(PageWrapper)``;

const Container = styled.div`
  padding-top: 5rem;
  margin: 0 auto;
  width: 110rem;
  display: flex;
`;

const Sidebar = () => {
  const handleClickItem = (path) => () => {
    console.log(`${path}로 변경!`);
  };

  return (
    <SidebarWrpper>
      <h4>마이페이지</h4>
      <SidebarContent>
        <p>쇼핑정보</p>
        <ul>
          {DUMMY.shopping.map(({ itemTitle, path }, i) => (
            <li key={i} onClick={handleClickItem(path)}>
              {itemTitle}
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarContent>
        <p>회원정보</p>
        <ul>
          {DUMMY.userInfo.map(({ itemTitle, path }, i) => (
            <li key={i} onClick={handleClickItem(path)}>
              {itemTitle}
            </li>
          ))}
        </ul>
      </SidebarContent>
    </SidebarWrpper>
  );
};

const SidebarWrpper = styled.div`
  margin-right: 3rem;
  width: 23rem;
  & > h4 {
    font-size: 2rem;
    font-weight: bold;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid silver;
  }
`;

const SidebarContent = styled.div`
  & > p {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 4rem;
    margin-bottom: 1rem;
  }
  & > ul > li {
    font-size: 1.4rem;
    padding: 0.7rem;
    color: #878787;
    cursor: pointer;
    &:hover {
      background: silver;
    }
  }
`;

const Content = styled.div`
  flex: 1;
`;

const ContentHeader = () => {
  return (
    <ContentHeaderWrapper>
      <div className="greeting">반가워요,</div>
      <p>홍영준님의</p>
      <p>회원등급은 일반회원그룹 입니다.</p>
    </ContentHeaderWrapper>
  );
};

const ContentHeaderWrapper = styled.div`
  .greeting {
    font-size: 4rem;
    font-weight: bold;
    margin: 2.5rem 0;
  }
  p {
    font-size: 1.7rem;
    line-height: 1.7rem;
  }
  p + p {
    margin-top: 1rem;
  }
`;

const ContentBody = () => {
  return (
    <ContentBodyWrapper>
      <Table
        checker
        ths={["상품명/옵션", "상품금액/수량	", "합계"]}
        ratio={[6, 2, 1]}
      >
        <tr>
          <td>test</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>test2</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </Table>
    </ContentBodyWrapper>
  );
};

const ContentBodyWrapper = styled.div``;

export default MyPage;
