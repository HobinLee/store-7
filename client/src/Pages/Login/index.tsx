import { PageWrapper } from "@/shared/styled";
import styled from "styled-components";
import Input from "@/Components/Input";
import { Link } from "@/Router";
import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";
import { gap } from "@/styles/theme";
import { POST } from "@/utils/axios";

const LoginPage = () => {
  const email = useInput("");
  const password = useInput("");
  const name = useInput("");
  const phoneNumber = useInput("");

  const handleSignin = async () => {
    console.log("handle signin");
    //TODO: 로그인 요청
    const result = await POST("/auth", {
      email: email.value,
      password: password.value,
    });
    console.log(result);
  };

  const checkSignupable = (): boolean => {
    //TODO: validion Check하기(?)
    return email.value.length > 0 && email.value.length > 0;
  };

  const checkLookupable = (): boolean => {
    //TODO: validion Check하기(?)
    return name.value.length > 0 && phoneNumber.value.length > 0;
  };

  return (
    <LoginPageWrapper>
      <LoginContent>
        <Form onSubmit={() => handleSignin()}>
          <Title>회원 로그인</Title>
          <Input
            placeholder="아이디 입력"
            value={email.value}
            onChange={email.onChange}
          />
          <Input
            placeholder="비밀번호 입력"
            value={password.value}
            type="password"
            onChange={password.onChange}
          />
          <div>아이디 저장</div>
          <Button
            onClick={() => handleSignin()}
            primary
            disabled={!checkSignupable()}
          >
            로그인
          </Button>
          <Button>Github 로그인</Button>
          <div className="login-form__footer">
            <Link to="/signup">회원가입</Link>
            <Link to="/findid">아이디 찾기</Link>
            <Link to="/findpw">비밀번호 찾기</Link>
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
            value={phoneNumber.value}
            onChange={phoneNumber.onChange}
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
  ${gap("2rem", "column")}
`;

export default LoginPage;
