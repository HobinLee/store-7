import GithubSVG from "@/assets/githubLogin.svg";
import GoogleSVG from "@/assets/googleLogin.svg";
import { gap } from "@/styles/theme";
import styled from "styled-components";
import ET from "@/assets/et.png";
import APIButton from "@/Components/APIButton";
import properties from "@/config/properties";

const OAuthLoginSection = ({
  handleETLogin,
}: {
  handleETLogin: () => Promise<void>;
}) => {
  const handleGithubLogin = async () => {
    window.location.href = properties.baseURL + "/auth/githubLogin";
  };
  const handleGoogleLogin = async () => {
    window.location.href = properties.baseURL + "/auth/googleLogin";
  };

  return (
    <Wrapper>
      <APIButton api={handleGithubLogin} className="github-login">
        <GithubSVG height="100%" filter="invert(100%)" />
      </APIButton>
      <APIButton api={handleGoogleLogin} className="google-login">
        <GoogleSVG height="100%" />
      </APIButton>
      <APIButton api={handleETLogin} className={"et-login"} primary={true}>
        <img className="et-icon" src={ET} alt="et-icon" />
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
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    padding: 1rem 0;
    ${({ theme }) => theme.borderRadius.medium}
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      svg {
        display: none;
      }
      opacity: 0.8;
      ::after {
        font-size: 1rem;
      }
    }
  }

  .github-login {
    background: ${({ theme }) => theme.color.body};
    color: white;
    &:hover::after {
      content: "깃헙 로그인";
    }
  }

  .google-login {
    background: white;
    border: 1px solid ${({ theme }) => theme.color.light_grey2};
    &:hover::after {
      content: "구글 로그인";
    }
  }
  .et-login {
    background: ${({ theme }) => theme.color.primary1};
    color: white;
    width: 100%;
    ${({ theme }) => theme.flexCenter}
    .et-icon {
      height: 130%;
      width: auto;
    }
    &:hover {
      .et-icon {
        display: none;
      }
    }
    &:hover::after {
      content: "시연용 로그인";
    }
  }
`;

export default OAuthLoginSection;
