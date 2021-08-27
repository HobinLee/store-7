import styled, { keyframes } from "styled-components";

export const AdminProduct = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;

  input {
    position: relative !important;
    border: 1px solid black;
    width: fit-content !important;
    height: 20px !important;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;

  div {
    display: flex;
    align-items: center;

    button {
      color: white;
      background-color: #2a78c3;
      padding: 10px 15px;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.2s;

      :hover {
        background-color: #2163a2;
        transform: scale(1.05);
      }
    }
  }
`;

export const SearchBox = styled.div`
  margin-right: 20px;

  input {
    background-color: #eaeaea;
    padding: 10px 15px;
    padding-right: 36px;
    border: 1px solid #d4d4d4;
    border-radius: 10px;

    :focus {
      border: 1px solid #2a78c3;
    }
  }

  img {
    width: 36px;
    margin-left: -40px;
    z-index: 1;
    cursor: pointer;
  }
`;

export const ProductListHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 2px solid gray;
  font-size: 12px;

  div {
    padding: 15px 0;
    text-align: center;

    :nth-child(1) {
      width: 5%;
    }
    :nth-child(2) {
      width: 55%;
    }
    :nth-child(3) {
      width: 10%;
    }
    :nth-child(4) {
      width: 10%;
    }
    :nth-child(5) {
      width: 10%;
    }
    :nth-child(6) {
      width: 10%;
    }
  }
`;

export const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ProductItem = styled.li`
  display: flex;
  width: 100%;
  padding: 10px 0;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px gainsboro;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    box-shadow: 4px 4px 6px gainsboro;
    transform: scale(1.01);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    text-align: center;
    overflow-y: hidden;
    font-size: 14px;

    :nth-child(1) {
      width: 5%;
    }
    :nth-child(2) {
      width: 55%;
      text-align: left;
      padding-left: 10px;
      justify-content: left;
    }
    :nth-child(3) {
      width: 10%;
    }
    :nth-child(4) {
      width: 10%;
    }
    :nth-child(5) {
      width: 10%;
    }
    :nth-child(6) {
      width: 10%;
    }

    > img {
      width: 55px;
      margin-right: 12px;
    }

    > .delete {
      background-color: #ff5d5d;
      padding: 5px 10px;
      color: white;
      border-radius: 5px;
      cursor: pointer;

      :hover {
        background-color: red;
      }
    }
  }
`;

const BackgroundShow = keyframes`
  0% {
    background-color: #00000000;
  }
  100% {
    background-color: #00000057;
  }
`;

export const ProductDetailBackground = styled.div<{ isShowed: boolean }>`
  display: ${({ isShowed }) => (isShowed ? "block" : "none")};
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: 0.2s;
  overflow: hidden;
  background-color: #00000057;
  animation-name: ${({ isShowed }) => (isShowed ? BackgroundShow : "none")};
  animation-duration: 1s;
`;

const ProductDetailShow = keyframes`
  0% {
    right: -700px;
  }
  100% {
    right: 0;
  }
`;
const ProductDetailHide = keyframes`
  0% {
    right: 0;
  }
  100% {
    right: -700px;
  }
`;

export const ProductDetail = styled.div<{ isShowed: boolean }>`
  position: absolute;
  width: 700px;
  height: 100%;
  top: 0;
  right: 0;
  background-color: #f7f7f7;
  box-shadow: -3px 0px 5px #dad7d7;
  z-index: 2;
  animation-name: ${({ isShowed }) =>
    isShowed ? ProductDetailShow : ProductDetailHide};
  animation-duration: 0.5s;

  > div {
    display: flex;
    padding: 60px;

    > img {
      width: 50%;
    }
    > div {
      display: flex;
      width: 50%;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
    }

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      margin-bottom: 20px;
      background-color: white;
      padding: 10px 0;
      border-radius: 10px;
      box-shadow: 1px 1px 2px gainsboro;

      > p {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 12px;
        text-align: center;
        color: #2a78c3;
      }
      > span {
        font-size: 18px;
        padding: 0 20px;

        &.red {
          color: #ff5d5d !important;
        }
      }
    }
    .info {
      display: flex;
      width: 90%;
      padding: 10px 0;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 45%;
        background-color: white;
        padding: 10px 0;
        border-radius: 10px;
        box-shadow: 1px 1px 2px gainsboro;

        > p {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
          text-align: center;
          color: #2a78c3;
        }
        > span {
          font-size: 16px;
          padding: 0 20px;
        }
      }
    }
  }
`;
