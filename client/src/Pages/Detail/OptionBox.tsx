import Button from "@/Components/Button";
import Input from "@/Components/Input";
import React from "react";
import styled from "styled-components";

const OptionBox = ({ numValue, handleClickNumVal }) => (
  <Wrapper>
    <div className="select-option">
      <div>으아아아악</div>
      <div className="select-option__right">
        <div className="num-input">
          <NumInput value={numValue.value} onChange={numValue.onChange} />
          <div>
            <button type="button" onClick={() => handleClickNumVal(1)}>
              .
            </button>
            <button type="button" onClick={() => handleClickNumVal(-1)}>
              .
            </button>
          </div>
        </div>
        10,000원
      </div>
    </div>

    <div className="total-price">
      <div>총 합계금액</div>10,000원
    </div>

    <div className="buttons">
      <Button>찜</Button>
      <Button>장바구니</Button>
      <Button primary>바로 구매</Button>
    </div>
  </Wrapper>
);

export default OptionBox;

const Wrapper = styled.div`
  .select-option {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.medium}
    justify-content: space-around;
    margin-top: 5rem;
    background: ${({ theme }) => theme.color.background};
    width: 100%;
    padding: 1.5rem 0;
    &__right {
      ${({ theme }) => theme.flexCenter}
      gap: 2rem;
      .num-input {
        ${({ theme }) => theme.flexCenter}
        div {
          ${({ theme }) => theme.flexCenter}
          flex-direction: column;
          button {
            cursor: pointer;
            border: none;
            background: ${({ theme }) => theme.color.primary2};
          }
        }
      }
    }
  }
  .total-price {
    ${({ theme }) => theme.flexCenter}
    ${({ theme }) => theme.font.xlarge}
    justify-content: space-between;
    padding: 2.25rem 0;
    border-top: 0.1rem solid ${({ theme }) => theme.color.line};
    width: 100%;
    margin-top: 10rem;
    color: ${({ theme }) => theme.color.primary1};
    & > * {
      ${({ theme }) => theme.font.medium}
      color: ${({ theme }) => theme.color.title_active};
    }
  }
  .buttons {
    ${({ theme }) => theme.flexCenter}
    width: 100%;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

const NumInput = styled(Input)`
  width: 3rem;
  text-align: center;
  padding: 1rem;
`;
