import { Link } from "@/Router";
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
          <Link to="/cart">
            <div>장바구니</div>
          </Link>
        </div>
      </Wrapper>
      <Menu category={category} />
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
  max-width: 100vw;
  z-index: 10;
  border-radius: 0 0 2rem 2rem;
  background: #333;

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
    margin-top: 2rem;
  }
  ${media[768]} {
    max-width: 100vw;
    border-radius: 0;
    img {
      margin-top: 0rem;
      height: 8rem;
      width: auto;
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
  }

  ${media[768]} {
    max-width: 100vw;
    padding: 0;
    height: 6rem;
    justify-content: center;
  }
`;

export default Header;
