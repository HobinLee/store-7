import styled from "styled-components";

export const AdminProductCreate = styled.div`
  padding: 30px;

  > .header {
    width: fit-content;
    color: white;
    background-color: #2a78c3;
    padding: 20px 40px;
    box-shadow: 3px 3px 5px #21609c;
    border-radius: 4px;
    font-size: 20px;
    transform: translate(15px, 60%);
  }
  > .content {
    padding: 20px;
    padding-top: 50px;
    background-color: white;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    box-shadow: 3px 3px 5px #d8d8d8;

    input {
      position: unset;
      width: 200px;
      height: unset;
      background-color: #2a78c3;
    }
  }
`;
