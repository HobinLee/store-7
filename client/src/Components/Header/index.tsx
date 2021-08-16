import { ETLink } from "@/Router";
import { Logo } from "@/assets";
import { ReactChild, useState } from "react";
import styled from "styled-components";
import SearchBar from "./Search";
import Menu from "./Menu";

const Header = ({ children }: { children?: ReactChild }) => {
  const [isLogined, setIsLogined] = useState(false);
  const handleLogin = () => {
    setIsLogined(!isLogined);
  };

  return (
    <TopWrapper>
      <Wrapper>
        <ETLink to="/">
          <img width="200" src={Logo} />
        </ETLink>
        <SearchBar />
        <div className="header__buttons">
          {isLogined ? (
            <>
              <ETLink to="/mypage">마이페이지</ETLink>
              <ETLink to="/collection">찜</ETLink>
            </>
          ) : (
            <ETLink to="/login">로그인</ETLink>
          )}
          <ETLink to="/mypage">
            <div>마이페이지</div>
          </ETLink>
          <ETLink to="/cart">
            <div>장바구니</div>
          </ETLink>
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
  background: ${({ theme }) => theme.color.white};

  .header__buttons {
    display: flex;
    flex-direction: row;
    gap: 5rem;

    a:hover {
      font-weight: bolder;
      color: ${({ theme }) => theme.color.primary1};
    }
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
`;

export default Header;
