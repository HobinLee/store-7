import styled from "styled-components";

export const AdminOrder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
`;

export const OrderListHeader = styled.div`
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
      width: 35%;
    }
    :nth-child(3) {
      width: 20%;
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
    :nth-child(7) {
      width: 10%;
    }
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderItem = styled.li`
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
    box-shadow: 5px 5px 7px gainsboro;
  }

  .red {
    color: #ff5d5d;
  }
  .yellow {
    color: #c3a40d;
  }
  .green {
    color: #0bb300;
  }

  div {
    position: relative;
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
      width: 35%;
      text-align: left;
      padding-left: 10px;
      justify-content: left;
    }
    :nth-child(3) {
      width: 20%;
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
    :nth-child(7) {
      width: 10%;
    }

    > img {
      width: 55px;
      margin-right: 12px;
    }

    > label {
      cursor: pointer;
    }

    :hover > ul {
      display: block;
    }
  }

  > .status {
    overflow-y: unset;
  }
`;

export const OrderItemStatus = styled.ul`
  position: absolute;
  display: none;
  top: 70%;
  background-color: white;
  border: 1px solid #ececec;
  border-radius: 10px;
  box-shadow: 3px 3px 5px gainsboro;
  z-index: 2;
  transition: 0.2s;

  > li {
    padding: 10px 10px;

    :hover {
      background-color: #e6e6e6;
    }
    :first-child {
      border-radius: 4px 4px 0 0;
    }
    :last-child {
      border-radius: 0 0 4px 4px;
    }
  }
`;
