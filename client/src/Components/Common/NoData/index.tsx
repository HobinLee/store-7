import styled from "styled-components";
import { NoData as Gif } from "@/assets";

const NoData = () => {
  return (
    <Wrapper>
      <img src={Gif} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  border-radius: 1rem;
  ${({ theme }) => theme.font.xlarge};
  img {
    width: 30rem;
  }
`;

export default NoData;
