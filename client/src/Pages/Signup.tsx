import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Address from "@/Components/Address";
import { AddressType } from "@/shared/type";

const SignupPage = () => {
  const handleChangeAddress = (address: AddressType) => {
    console.log(address);
  };
  return (
    <Wrapper>
      <Address onChangeAddress={handleChangeAddress} />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)``;

export default SignupPage;
