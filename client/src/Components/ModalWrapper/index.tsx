import styled from "styled-components";
import { Close } from "@/assets";
import { ReactChild } from "react";

export type ModalWrapperProps = {
  closeModal?: Function;
  children: ReactChild;
  title?: string;
  className?: string;
  hideCloseBtn?: boolean;
};

const ModalWrapper = ({
  closeModal,
  children,
  title,
  className,
  hideCloseBtn = false,
}: ModalWrapperProps) => {
  return (
    <div onClick={() => closeModal()}>
      <Wrapper>
        <Modal onClick={(e) => e.stopPropagation()} className={className}>
          <div className="header">{title}</div>
          {!hideCloseBtn && (
            <Close
              data-testid="close-btn"
              role="button"
              onClick={closeModal}
              className="close-btn"
            />
          )}
          {children}
        </Modal>
      </Wrapper>
      <Background />
    </div>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
`;

const Modal = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.shadow};
  flex-direction: column;
  background: #fff;
  width: 50rem;
  padding: 3rem;
  border-radius: 1rem;
  position: relative;
  .close-btn {
    position: absolute;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
  }
  .header {
    ${({ theme }) => theme.font.large};
    margin: 1rem;
    color: ${({ theme }) => theme.color.primary1};
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 100;
`;

export default ModalWrapper;
