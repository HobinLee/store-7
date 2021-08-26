import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  background-color: #2a78c3;

  > img {
    width: 70%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

export const SideBarItem = styled.div<{ isCurrentPage: boolean }>`
  display: flex;
  height: 50px;
  color: white;
  font-size: 22px;
  line-height: 50px;
  align-items: center;
  padding: 5px 0;
  padding-left: 20px;
  background-color: ${({ isCurrentPage }) =>
    isCurrentPage ? "#2465a5" : "#2a78c3"};
  cursor: pointer;
  border-radius: 0 25px 25px 0;
  transition: 0.2s;

  img {
    margin-right: 10px;
    height: 26px;
  }

  :hover {
    background-color: #2465a5;
  }
`;

export const ContentBox = styled.div`
  width: calc(100vw - 300px);
  height: 100%;
  background-color: #f7f7f7;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f7f7f7;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #2a78c3;

    :hover {
      background: #2465a5;
    }
  }
`;
