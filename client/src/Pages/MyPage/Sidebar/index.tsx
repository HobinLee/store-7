import React from "react";
import styled from "styled-components";
import { sampleMypage } from "@/shared/dummy";
import SignatureLine from "@/Components/SignatureLine";
import { ETLink } from "@/Router";

const Sidebar = () => {
  return (
    <SidebarWrpper>
      <SidebarContent>
        <SignatureLine type="short2" />
        <p>쇼핑정보</p>
        <ul>
          {sampleMypage.shopping.map(({ itemTitle, path }, i) => (
            <li key={i}>
              <ETLink to={`/mypage/${path}`}>{itemTitle}</ETLink>
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarContent>
        <SignatureLine type="short3" />
        <p>회원정보</p>
        <ul>
          {sampleMypage.userInfo.map(({ itemTitle, path }, i) => (
            <li key={i}>
              <ETLink to={`/mypage/${path}`}>{itemTitle}</ETLink>
            </li>
          ))}
        </ul>
      </SidebarContent>
    </SidebarWrpper>
  );
};

const SidebarWrpper = styled.div`
  margin-right: 5rem;
  width: 20rem;
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

    & > *:hover {
      color: black;
      font-weight: bold;
    }
  }
`;

export default Sidebar;
