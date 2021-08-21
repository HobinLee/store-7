import GithubSVG from "@/assets/githubLogin.svg";
import GoogleSVG from "@/assets/googleLogin.svg";
import { gap } from "@/styles/theme";
import styled from "styled-components";
import APIButton from "@/Components/APIButton";

const OAuthLoginSection = () => {
  const handleGithubLogin = async () => {
    window.location.href = process.env.BASE_URL + "/auth/githubLogin";
  };
  const handleGoogleLogin = async () => {
    window.location.href = process.env.BASE_URL + "/auth/googleLogin";
  };

  return (
    <Wrapper>
      <APIButton api={handleGithubLogin} className="github-login">
        <GithubSVG height="100%" filter="invert(100%)" />
      </APIButton>
      <APIButton api={handleGoogleLogin} className="google-login">
        <GoogleSVG height="100%" />
      </APIButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${gap("2rem")};
  button {
    width: 100%;
    height: 5rem;
    padding: 1rem;
    ${({ theme }) => theme.borderRadius.medium}
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      opacity: 0.8;
    }
  }

  .github-login {
    background: ${({ theme }) => theme.color.body};
  }

  .google-login {
    background: white;
    border: 1px solid ${({ theme }) => theme.color.light_grey2};
  }
`;

export default OAuthLoginSection;
