import { Loading, Search } from "@/assets";
import styled from "styled-components";
import Image from "@/Components/Image";

const ToggleImageWrapper = ({ src }: { src: string }) => {
  return (
    <Wrapper>
      <Image src={src} lazyload={true} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  ${({ theme }) => theme.borderRadius.medium}
  height: 100%;

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
