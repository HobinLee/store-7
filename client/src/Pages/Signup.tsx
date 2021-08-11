import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Address, { AddressType } from "@/Components/Address";

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
