import { Welcome as Gif, HomePage, BackOffice } from "@/assets";
import { moveTo } from "@/Router";
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
  img {
    cursor: pointer;
    margin: 5rem;
    width: 60%;
  }
  .buttons {
    width: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
      ${({ theme }) => theme.font.xlarge};
    }
  }
`;

export default Welcome;
