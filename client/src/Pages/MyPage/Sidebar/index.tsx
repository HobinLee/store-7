import React from "react";
import styled from "styled-components";
import { sampleMypage } from "@/shared/dummy";
import { LINE } from "@/styles/lineLink";

const Sidebar = () => {
  const handleClickItem = (path) => () => {
    console.log(`${path}로 변경!`);
  };

  return (
    <SidebarWrpper>
      <SignatureLine type="short1" />
      <h4>마이페이지</h4>
      <SidebarContent>
        <SignatureLine type="short2" />
        <p>쇼핑정보</p>
        <ul>
          {sampleMypage.shopping.map(({ itemTitle, path }, i) => (
            <li key={i} onClick={handleClickItem(path)}>
              {itemTitle}
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarContent>
        <SignatureLine type="short3" />
        <p>회원정보</p>
        <ul>
          {sampleMypage.userInfo.map(({ itemTitle, path }, i) => (
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
    ${({ theme }) => theme.font.large}
    margin-bottom: 6rem;
  }
`;

const SidebarContent = styled.div`
  margin-bottom: 4rem;
  & > p {
    ${({ theme }) => theme.font.medium}
    margin-bottom: 1rem;
  }
  & > ul > li {
    font-size: 1.4rem;
    padding: 0.7rem;
    color: #878787;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

const SignatureLine = styled.div<{ type: string }>`
  width: 100%;
  height: 2rem;
  background: url(${({ type }) => LINE[type]}) no-repeat;
`;

export default Sidebar;
