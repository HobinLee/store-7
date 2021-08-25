import styled from "styled-components";

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

  div {
    padding: 10px 0;
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
