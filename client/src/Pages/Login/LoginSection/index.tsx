import useInput from "@/hooks/useInput";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/store/state";
import { signIn } from "@/api/auth";
import { Link } from "@/Router";
import Button from "@/Components/Button";
import APIButton from "@/Components/APIButton";
import OAuthLoginSection from "../OAuthLoginSection";
import { gap } from "@/styles/theme";
import Input from "@/Components/Input";

const LoginSection = () => {
  const email = useInput("");
  const password = useInput("");
  const setLoginState = useSetRecoilState(loginState);

  const handleSignin = async (isDemo) => {
    await signIn({
      email: isDemo ? process.env.DEMO_EMAIL : email.value,
      password: isDemo ? process.env.DEMO_PW : password.value,
    });

    setLoginState(true);
  };

  const checkSignupable = (): boolean => {
    //TODO: validion Check하기(?)
    return email.value.length > 0 && password.value.length > 0;
  };

  return (
    <Form onSubmit={() => handleSignin(true)}>
      <h3>회원 로그인</h3>
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
      <APIButton
        api={() => handleSignin(false)}
        primary
        disabled={!checkSignupable()}
        className={"login-form__login"}
      >
        로그인
      </APIButton>
      <APIButton api={() => handleSignin(true)} className={"login-form__demo"}>
        시연용 아이디로 로그인
      </APIButton>
      <OAuthLoginSection />
      <div className="login-form__footer">
        <Link to="/signup">회원가입</Link>
        <Link to="/findid">아이디 찾기</Link>
        <Link to="/findpw">비밀번호 찾기</Link>
      </div>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  ${gap("2rem", "column")}

  h3 {
    text-align: center;
    ${({ theme }) => theme.font.large}
  }

  .login-form__login {
    height: 5rem;
  }

  .login-form__demo {
    height: 5rem;
    color: ${({ theme }) => theme.color.primary3};
    &:disabled {
      background-color: ${({ theme }) => theme.color.light_grey1};
    }
  }
`;

export default LoginSection;
