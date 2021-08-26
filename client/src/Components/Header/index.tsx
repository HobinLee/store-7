import styled from "styled-components";
import Menu from "./Menu";
import Navigator from "./Navigator";
import { gap, media } from "@/styles/theme";

const Header = () => {
  return (
    <TopWrapper>
      <Navigator />
      <Menu />
    </TopWrapper>
  );
};

const TopWrapper = styled.div`
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 30;
  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.color.white};
  ${media.mobile} {
    position: sticky;
    top: -7rem;
  }

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

  .close-btn {
    display: none;
  }
`;

export default Header;
