import { Welcome as Gif, HomePage, BackOffice } from "@/assets";
import { moveTo } from "@/Router";
import { media } from "@/styles/theme";
import styled from "styled-components";

const Welcome = () => {
  return (
    <Wrapper>
      <div className="buttons">
        <img src={HomePage} onClick={() => moveTo("/")} />
        <img src={BackOffice} onClick={() => moveTo("/admin")} />
      </div>
      <img src={Gif} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: 100%;
  height: 100vh;
  background: #fff;
  ${media.tablet} {
    flex-direction: column;
  }
  img {
    margin: 5rem;
    width: 60%;
  }
  .buttons {
    width: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      cursor: pointer;
    }
    ${media.tablet} {
      justify-content: center;
      flex-direction: row;
    }
  }
`;

export default Welcome;
