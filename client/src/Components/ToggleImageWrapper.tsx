import { Loading, Search } from "@/assets";
import styled from "styled-components";

const ToggleImageWrapper = ({ src }: { src: string }) => {
  return (
    <Wrapper>
      <img src={src} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  ${({ theme }) => theme.borderRadius.medium}

  & > img {
    display: block;
    width: 100%;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

export default ToggleImageWrapper;
