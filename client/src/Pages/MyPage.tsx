import Header from "@/Components/Header";
import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import MainPage from "./Main";

const DUMMY = {
  shopping: [
    { itemTitle: "주문목록/배송조회", path: "itemlist" },
    { itemTitle: "찜리스트", path: "wishlist" },
  ],
  userInfo: [
    { itemTitle: "회원정보 변경", path: "changeUserInfo" },
    { itemTitle: "나의 상품문의", path: "question" },
    { itemTitle: "나의 상품후기", path: "review" },
  ],
  tableHeader: {
    order: [
      { head: "날짜/주문번호", flex: 1 },
      { head: "상품명/옵션", flex: 7 },
      { head: "상품금액/수량", flex: 1 },
      { head: "주문상태", flex: 1 },
      { head: "확인/리뷰", flex: 1 },
    ],
    wish: [
      { head: "체크", flex: 1 },
      { head: "상품명/옵션", flex: 7 },
      { head: "상품금액/수량", flex: 1 },
      { head: "합계", flex: 1 },
    ],
    question: [
      { head: "문의날짜", flex: 1 },
      { head: "카테고리", flex: 7 },
      { head: "제목", flex: 1 },
      { head: "문의상태", flex: 1 },
    ],
    review: [
      { head: "번호", flex: 1 },
      { head: "제목", flex: 7 },
      { head: "날짜", flex: 1 },
      { head: "작성자", flex: 1 },
    ],
  },
};

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
      <Table type="order" />
    </ContentBodyWrapper>
  );
};

const ContentBodyWrapper = styled.div``;

type TableType = {
  type: string;
  list?: any;
};

const Table = ({ type, list }: TableType) => {
  const array = DUMMY.tableHeader[type];
  return <TableWrapper header={array}></TableWrapper>;
};

type TableWrapperType = {
  header: any;
};

const TableWrapper = styled.div<TableWrapperType>`
  display: grid;
  grid-template-columns: ${({ header }) =>
    header.map(({ flex }) => `${flex}fr `).join("")};
`;
export default MyPage;
