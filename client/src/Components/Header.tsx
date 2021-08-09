import useInput from "@/hooks/useInput";
import { flexCenter, shadow } from "@/styles/global-style";
import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Menu from "./Menu";

const Header = () => {
  const searchValue = useInput("");
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#fff",
      }}
    >
      <Nav>로그인 회원가입</Nav>
      <Wrapper>
        <Menu />
        <img
          width="200"
          src="https://store.baemin.com/data/skin/front/udweb_C/img/banner/7d4c23c41296ae46ffff9e8da1350b37_56349.png"
        />
        <div className="input-box">
          <div className="input-box__select">전체</div>
          <Search
            placeholder="검색어를 입력해주세요."
            value={searchValue.value}
            onChange={searchValue.onChange}
          />
        </div>
        <div>마이페이지</div>
        <div>장바구니</div>
      </Wrapper>
    </div>
  );
};

const Nav = styled.div`
  font-size: 1.2rem;
  text-align: end;
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  ${flexCenter}
  ${shadow}
  padding: 0 10rem;
  box-sizing: border-box;
  justify-content: space-around;
  font-size: 1.6rem;
  width: 100%;
  height: 10rem;
  .input-box {
    ${flexCenter}
    border: 0.3rem solid ${({ theme }) => theme.color.primary1};
    &__select {
      border-right: 0.1rem solid ${({ theme }) => theme.color.primary1};
      padding: 0 1.5rem;
      width: 8rem;
    }
  }
`;

const Search = styled(Input)`
  border: none;
  padding: 1rem;
  width: 30rem;
  font-size: 1.6rem;
  text-align: left;
`;

export default Header;
