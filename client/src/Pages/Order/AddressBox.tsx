import React from "react";
import styled from "styled-components";
import { AddressType } from "@/shared/type";
import Button from "@/Components/Button";
import { SetStateAction } from "react";
import { Dispatch } from "react";

type AddressBoxProps = {
  setPage: Dispatch<SetStateAction<"select" | "add">>;
  address: AddressType;
};

const AddressBox = ({ setPage, address }: AddressBoxProps) => {
  const handleChangeaddress = (address: AddressType) => {
    console.log(address);
  };
  return (
    <Wrapper>
      <div>
        <div className="name">집</div>
        <div>서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호</div>
        <div>이정민 010-010101001</div>
        <div>
          <Button>삭제</Button>
          <Button>수정</Button>
          <Button>선택</Button>
        </div>
        <Button onClick={() => setPage("add")}>배송지 추가</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .name {
  }
`;

export default AddressBox;
