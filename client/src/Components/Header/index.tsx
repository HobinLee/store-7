import { Link, moveTo } from "@/Router";
import { HeaderLogo } from "@/assets";
import { ReactChild } from "react";
import styled from "styled-components";
import SearchBar from "./Search";
import Menu from "./Menu";
import { gap, media } from "@/styles/theme";
import { DELETE } from "@/utils/axios";
import { useRecoilState } from "recoil";
import { loginState } from "@/store/state";

interface HeaderPropsType {
  children?: ReactChild;
  category?: string;
}

const Header = ({ children, category }: HeaderPropsType) => {
  const [isLogined, setLoginState] = useRecoilState(loginState);

  const handleSignout = async () => {
    await DELETE("/auth");
    setLoginState(false);
    moveTo("/");
  };

  return (
    <TopWrapper>
      <Wrapper>
        <Link to="/">
          <img width="170" style={{ marginTop: "1rem" }} src={HeaderLogo} />
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
          <Link to="/cart">장바구니</Link>
        </div>
      </Wrapper>
      <Menu category={category} />
      {children ?? ""}
    </TopWrapper>
  );
};

const TopWrapper = styled.div`
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 30;
  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.color.light_grey1};

  .header__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    ${gap("5rem")}

    color: ${({ theme }) => theme.color.primary1};

    a {
      display: block;
    }
    a:hover {
      font-weight: bolder;
    }
  }

  img {
    width: 14rem;
    height: auto;
    margin-top: 2rem;
  }
  ${media.tablet} {
    img {
      width: 11rem;
      height: auto;
    }
  }
  ${media.mobile} {
    max-width: 100vw;
    border-radius: 0;
    img {
      margin-top: 0rem;
      width: 12rem;
      height: auto;
    }
    .header__buttons {
      display: none;
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
  .signout-button {
    color: ${({ theme }) => theme.color.primary1};
    cursor: pointer;
    &:hover {
      font-weight: bolder;
    }
  }

  ${media.mobile} {
    max-width: 100vw;
    padding: 0;
    height: 6rem;
    justify-content: center;
  }
`;

export default Header;
