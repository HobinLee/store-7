import { ETLink } from "@/Router";
import LogoImg from "@/assets/logo.png";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./Search";
import Menu from "./Menu";

const Header = () => {
  const [isLogined, setIsLogined] = useState(false);
  const handleLogin = () => {
    setIsLogined(!isLogined);
  }

  return (
    <TopWrapper>
      <Nav>로그인 회원가입</Nav>
      <Wrapper>
        <Menu />
        <ETLink to="/">
          <img
            width="200"
            src={LogoImg}
          />
        </ETLink>
        <SearchBar />
        {isLogined ? <ETLink to="/mypage">마이페이지</ETLink> : <a onClick={handleLogin}>로그인</a>}
        <ETLink to="/cart">
          <div>장바구니</div>
        </ETLink>
      </Wrapper>
    </TopWrapper>
  );
};

const TopWrapper = styled.div`
  ${({ theme }) => theme.shadow}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: ${({ theme }) => theme.color.white};
`;

const Nav = styled.div`
  ${({theme}) => theme.font.small}
  text-align: end;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.primary2};
`;

const Wrapper = styled.div`
  ${({theme}) => theme.flexCenter}
  ${({theme}) => theme.font.medium}
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 120rem;
  margin: auto;
  height: 10rem;
  padding: 0 5rem;
`;


export default Header;
