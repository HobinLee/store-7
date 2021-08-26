import { imageZoom } from "@/utils/util";
import { useEffect } from "react";
import styled from "styled-components";

const ZoomModal = () => {
  useEffect(() => {
    imageZoom("image", "zoom-box", "zoom-lens");
  }, []);

  return <Wrapper data-testid="zoom-box" id="zoom-box"></Wrapper>;
};

const Wrapper = styled.div`
  ${({ theme }) => theme.shadow};
  ${({ theme }) => theme.borderRadius.medium};
  position: absolute;
  top: 0;
  left: 52rem;
  width: 50rem;
  height: 50rem;
  z-index: 10;
  background: #fff;
`;

export default ZoomModal;
