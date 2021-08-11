import React from "react";
import styled from "styled-components";
import { Close } from "@/assets/";
import { ReactChild } from "react";

type ReviewModalType = {
  closeModal: Function;
  children: ReactChild;
  title?: string;
};

const ModalWrapper = ({ closeModal, children, title }: ReviewModalType) => {
  return (
    <>
      <Wrapper>
        <Modal>
          <div className="header">{title}</div>
          <Close onClick={closeModal} className="close-btn" />
          {children}
        </Modal>
      </Wrapper>
      <Background />
    </>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
  z-index: 50;
`;

export default ModalWrapper;
