import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Address from "@/Components/Address";
import ModalWrapper from "@/Components/ModalWrapper";
import { useState } from "react";
import DestinationBox from "./AddressBox";
import { sampleUser } from "@/shared/dummy";
import { AddressType } from "@/shared/type";

const AddressModal = ({ closeModal }) => {
  const handleChangeAddress = (address: AddressType) => {
    console.log(address);
  };

  const [page, setPage] = useState<"select" | "add">("select");

  return (
    <ModalWrapper title="배송지 선택" {...{ closeModal }}>
      <Wrapper>
        {page === "select" ? (
          sampleUser.addresses.map((address) => (
            <DestinationBox {...{ setPage, address }} />
          ))
        ) : (
          <div>
            <Address onChangeAddress={handleChangeAddress} />
          </div>
        )}
      </Wrapper>
    </ModalWrapper>
  );
};

const Wrapper = styled(PageWrapper)``;

export default AddressModal;
