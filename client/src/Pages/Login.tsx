import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Input from "@/Components/Input";
import { ETLink } from "@/Router";

const LoginPage = () => {
  const handleValueChange = (e) => {}
  
  return <Wrapper>
    <LoginContent>
      <Form>
        <Title>회원 로그인</Title>
        <Input value='id' onChange={handleValueChange}/>
        <Input value='pw' type='password' onChange={handleValueChange}/>
        <div>아이디 저장</div>
        <Button>로그인</Button>
        <Button>페이스북 로그인</Button>
        <div className="login-form__footer">
          <ETLink to='/signup'>회원가입</ETLink>
          <ETLink to='/findid'>아이디 찾기</ETLink>
          <ETLink to='/findpw'>비밀번호 찾기</ETLink>
        </div>
      </Form>
      <Form>
        <Title>비회원 주문조회 하기</Title>
        <Input value='주문자명' onChange={handleValueChange}/>
        <Input value='주문 번호' onChange={handleValueChange}/>
        <Button>조회하기</Button>
        <span>주문번호와 비밀번호를 잊으신 경우, 고객센터로 문의하여 주시기 바랍니다.</span>
      </Form>
    </LoginContent>
  </Wrapper>;
};

const Wrapper = styled(PageWrapper)`
  input {
    font-size: 1.4rem;
    color: #222;
    box-sizing: border-box;
    height: 4rem;
    width: 100%;
    border-color: #aaa;
  }
  .login-form__footer {
    padding-bottom: 4rem;
    margin-bottom: 4rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    a {
      text-align: center;
      width: 100%;
      border-right: 1px solid #ddd;
    }
    
    a:last-child {
      border: none;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  height: 6rem;
  background-color: #222;
  color: #eee;
  font-size: 1.8rem;
  border: none;
`;

const LoginContent = styled.div`
  padding: 3rem 14.5rem;
  margin: auto;
  width: 30rem;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 2.4rem;
`

const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export default LoginPage;
