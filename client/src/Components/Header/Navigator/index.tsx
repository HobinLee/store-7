import { Link, moveTo } from "@/Router";
import {
  HeaderLogo,
  Cart,
  Search,
  Logout,
  Login,
  MyPage,
  Home,
} from "@/assets";
import { media } from "@/styles/theme";
import styled from "styled-components";
import SearchBar from "../Search";
import { DELETE } from "@/utils/axios";
import { useRecoilState } from "recoil";
import { loginState } from "@/store/state";
import { useState } from "react";
import SearchModal from "../Search/Modal";
import ModalWrapper from "@/Components/ModalWrapper";

const Navigator = () => {
  const [isLoggedin, setLoginState] = useRecoilState(loginState);
  const [isSearchMode, setSearchMode] = useState(false);

  const handleSignout = async () => {
    await DELETE("/auth");
    setLoginState(false);
    moveTo("/");
  };

  const handleMobileSearch = () => {
    setSearchMode(true);
  };

  return (
    <Wrapper>
      <Link to="/">
        <img width="170" style={{ marginTop: "1rem" }} src={HeaderLogo} />
      </Link>
      <div className="search-area">
        <SearchBar />
      </div>
      <Nav>
        {isLoggedin ? (
          <>
            <Link to="/mypage">
              <MyPage />
              마이페이지
            </Link>
            <a className="signout-button" onClick={handleSignout}>
              <Logout />
              로그아웃
            </a>
          </>
        ) : (
          <Link to="/login">
            <Login />
            로그인
          </Link>
        )}
        <Link to="/cart">
          <Cart />
          장바구니
        </Link>
        <a className="search-button" onClick={handleMobileSearch}>
          <Search />
          검색
        </a>
        <a className="mobile__only" onClick={() => moveTo("/")}>
          <Home />홈
        </a>
      </Nav>
      {isSearchMode && (
        <ModalWrapper closeModal={() => setSearchMode(false)}>
          <SearchModal />
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 120rem;
  margin: auto;
  height: 10rem;
  padding: 0 5rem;

  ${media.mobile} {
    max-width: 100vw;
    padding: 0;
    height: 7rem;
    justify-content: center;
  }
  .search-area {
    width: 40vw;
    max-width: 60rem;
    ${media.custom(800)} {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  color: ${({ theme }) => theme.color.primary1};
  cursor: pointer;

  a:hover {
    font-weight: bolder;
  }

  a {
    margin-left: 2rem;
    svg {
      display: none;
    }
  }
  .search-button {
    display: none;

    ${media.custom(800)} {
      display: inline-block;
    }
    ${media.mobile} {
      display: flex;
    }
  }

  ${media.mobile} {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 1rem 0;
    height: 8rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    background-color: white;
    border-top: 1px solid ${({ theme }) => theme.color.light_grey1};
    color: ${({ theme }) => theme.color.grey1};
    a {
      margin: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg {
        display: block;
        width: 3rem;
        height: 3rem;
        margin-bottom: 1rem;
        fill: #777;
      }
    }
  }
`;
export default Navigator;
