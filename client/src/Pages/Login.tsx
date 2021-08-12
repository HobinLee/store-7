import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Input from "@/Components/Input";
import { ETLink } from "@/Router";
import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";

const LoginPage = () => {
  const id = useInput("");
  const pw = useInput("");
  const name = useInput("");
  const number = useInput("");

  const handleSignin = () => {
    //TODO: 로그인 요청
    setTimeout(() => {
      //로그인 처리
      window.location.href = "/";
    }, 1000);
  };

  const checkSignupable = (): boolean => {
    //TODO: validion Check하기(?)
    return id.value.length > 0 && pw.value.length > 0;
  };

  const checkLookupable = (): boolean => {
    //TODO: validion Check하기(?)
    return name.value.length > 0 && number.value.length > 0;
  };

  return (
    <LoginPageWrapper>
      <LoginContent>
        <Form onSubmit={handleSignin}>
          <Title>회원 로그인</Title>
          <Input
            placeholder="아이디 입력"
            value={id.value}
            onChange={id.onChange}
          />
          <Input
            placeholder="비밀번호 입력"
            value={pw.value}
            type="password"
            onChange={pw.onChange}
          />
          <div>아이디 저장</div>
          <Button primary disabled={!checkSignupable()}>
            로그인
          </Button>
          <Button>Github 로그인</Button>
          <div className="login-form__footer">
            <ETLink to="/signup">회원가입</ETLink>
            <ETLink to="/findid">아이디 찾기</ETLink>
            <ETLink to="/findpw">비밀번호 찾기</ETLink>
          </div>
        </Form>
        <Form>
          <Title>비회원 주문조회 하기</Title>
          <Input
            placeholder="주문자명"
            value={name.value}
            onChange={name.onChange}
          />
          <Input
            placeholder="주문번호"
            value={number.value}
            onChange={number.onChange}
          />
          <Button disabled={!checkLookupable()}>조회하기</Button>
          <span>
            주문번호와 비밀번호를 잊으신 경우, 고객센터로 문의하여 주시기
            바랍니다.
          </span>
        </Form>
      </LoginContent>
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled(PageWrapper)`
  box-sizing: border-box;
  margin: auto;
  padding: 10rem;

  input {
    ${({ theme }) => theme.font.medium}
    color: ${({ theme }) => theme.color.body};
    box-sizing: border-box;
    height: 4rem;
    width: 100%;
    padding: 0px 1rem;
    background: ${({ theme }) => theme.color.off_white};
    border-radius: 0.5rem;

    ::placeholder {
      color: ${({ theme }) => theme.color.grey2};
    }
  }

  .login-form__footer {
    padding-bottom: 5rem;
    margin-bottom: 5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.light_grey2};
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    a {
      text-align: center;
      width: 100%;
      border-right: 1px solid ${({ theme }) => theme.color.light_grey2};
    }

    a:last-child {
      border: none;
    }
  }
`;

const LoginContent = styled.div`
  padding: 3rem 14.5rem;
  margin: auto;
  width: 30rem;
`;

const Title = styled.h3`
  text-align: center;
  ${({ theme }) => theme.font.large}
`;

const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default LoginPage;
