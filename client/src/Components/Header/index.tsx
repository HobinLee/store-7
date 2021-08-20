import { Link } from "@/Router";
import { Logo } from "@/assets";
import { ReactChild, useState } from "react";
import styled from "styled-components";
import SearchBar from "./Search";
import Menu from "./Menu";
import { gap } from "@/styles/theme";
import { DELETE } from "@/utils/axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "@/store/state";

const Header = ({ children }: { children?: ReactChild }) => {
  const [isLogined, setLoginState] = useRecoilState(loginState);

  const handleSignout = async () => {
    try {
      await DELETE("/auth");
      alert("로그아웃 성공");
      setLoginState(false);
    } catch (e) {}
  };

  return (
    <TopWrapper>
      <Wrapper>
        <Link to="/">
          <img width="150" src={Logo} />
        </Link>
        <SearchBar />
        <div className="header__buttons">
          {isLogined ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <button className="signout-button" onClick={handleSignout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
          <Link to="/cart">
            <div>장바구니</div>
          </Link>
        </div>
      </Wrapper>
      <Menu />
      {children ?? ""}
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
  background: #000;
  border-radius: 0 0 2rem 2rem;

  .header__buttons {
    display: flex;
    flex-direction: row;
    ${gap("5rem")}

    a {
      color: ${({ theme }) => theme.color.primary1};
    }

    a:hover {
      font-weight: bolder;
      color: ${({ theme }) => theme.color.primary1};
    }
  }

  img {
    margin-top: 3rem;
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 120rem;
  margin: auto;
  height: 10rem;
  padding: 0 5rem;
  .signout-button {
    color: ${({ theme }) => theme.color.primary1};
    cursor: pointer;
  }
`;

export default Header;
