import styled from "styled-components";

export const AdminHome = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

export const ChartHorizontalLayer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChartVerticalLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;

export const ChartBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  border: 1px solid #e6e6e6;
  margin: 20px;

  > div {
    font-size: 20px;

    > span {
      font-weight: bold;
      color: #2b77c2;
    }
  }
`;
