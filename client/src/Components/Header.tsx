import useInput from "@/hooks/useInput";
import { ETLink } from "@/Router";
import { DropdownWrapper, DropdownItem } from "@/shared/styled";
import {
  flexCenter,
  shadow,
  textMedium,
  textSmall,
} from "@/styles/global-style";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import Menu from "./Menu";

const Header = () => {
  const searchValue = useInput("");

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const [category, setCategory] = useState("전체");
  const handleCategory = (val: string) => {
    setCategory(val);
  };

  const [isSearchBoxOpened, setIsSearchBoxOpened] = useState(false);
  const handleSearchBoxOpen = () => {
    setIsSearchBoxOpened(!isSearchBoxOpened);
  };

  useEffect(() => {
    console.log(searchValue.value);
  }, [searchValue]);

  return (
    <TopWrapper>
      <Nav>로그인 회원가입</Nav>
      <Wrapper>
        <Menu />
        <ETLink to="/">
          <img
            width="200"
            src="https://store.baemin.com/data/skin/front/udweb_C/img/banner/7d4c23c41296ae46ffff9e8da1350b37_56349.png"
          />
        </ETLink>

        <div className="input-box">
          <div onClick={handleMenuOpen} className="input-box__select">
            {category}
            {isMenuOpened && (
              <DropdownWrapper style={{ left: 0, top: "3rem" }}>
                {[0, 0, 0, 0, 0, 0, 0].map((i, idx) => (
                  <DropdownItem
                    onClick={() => handleCategory("asdf")}
                    key={i.toString()}
                  >
                    asdf
                  </DropdownItem>
                ))}
              </DropdownWrapper>
            )}
          </div>
          <div style={{ position: "relative" }} onClick={handleSearchBoxOpen}>
            <Search
              placeholder="검색어를 입력해주세요."
              value={searchValue.value}
              onChange={searchValue.onChange}
            />
            {isSearchBoxOpened && <SearchBox>최근검색어</SearchBox>}
          </div>
        </div>

        <div>마이페이지</div>
        <ETLink to="/cart">
          <div>장바구니</div>
        </ETLink>
      </Wrapper>
    </TopWrapper>
  );
};

const TopWrapper = styled.div`
  ${shadow}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: ${({ theme }) => theme.color.background};
`;

const Nav = styled.div`
  ${textSmall}
  text-align: end;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.primary2};
`;

const SearchBox = styled.div`
  position: absolute;
  background: #fff;
`;

const Wrapper = styled.div`
  ${flexCenter}
  ${textMedium}
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 120rem;
  margin: auto;
  height: 10rem;
  padding: 0 5rem;
  .input-box {
    ${flexCenter}
    border: 0.3rem solid ${({ theme }) => theme.color.primary1};
    &__select {
      position: relative;
      border-right: 0.1rem solid ${({ theme }) => theme.color.primary1};
      padding: 0 1.5rem;
      width: 11rem;
      box-sizing: border-box;
      height: 100%;
    }
  }
`;

const Search = styled(Input)`
  ${textMedium}
  border: none;
  padding: 1rem 1.5rem;
  width: 30rem;
  text-align: left;
`;

export default Header;
