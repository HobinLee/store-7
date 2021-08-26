import GithubSVG from "@/assets/githubLogin.svg";
import GoogleSVG from "@/assets/googleLogin.svg";
import { gap } from "@/styles/theme";
import styled from "styled-components";
import ET from "@/assets/et.png";
import APIButton from "@/Components/APIButton";
import properties from "@/config/properties";
import { Link } from "@/Router";

const OAuthLoginSection = () => {
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
      <button className="et-login">
        <Link to="/signup">
          <img src={ET} />
        </Link>
      </button>
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
  .et-login {
    background: ${({ theme }) => theme.color.primary1};
    color: white;
    width: 100%;
    a {
      display: block;
      width: 100%;
      height: 100%;
      ${({ theme }) => theme.flexCenter}
    }
    img {
      height: 130%;
      width: auto;
    }
  }
`;

export default OAuthLoginSection;
