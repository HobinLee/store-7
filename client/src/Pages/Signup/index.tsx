import { PageWrapper } from "@/shared/styled";
import React, { useState } from "react";
import styled from "styled-components";
import Address from "@/Components/Address";
import useInput from "@/hooks/useInput";
import InputSection from "./InputSection";
import Input from "@/Components/Input";
import { AddressType } from "@/shared/type";
import Button from "@/Components/Button";

const SignupPage = () => {
  const email = useInput("");
  const pw = useInput("");
  const pwConfirm = useInput("");
  const name = useInput("");
  const phone = useInput("");

  const [address, setAddress] = useState<AddressType>({
    postcode: {},
    detailAddress: "",
  });

  const handleChangeAddress = (address: AddressType) => {
    setAddress(address);
  };

  return (
    <Wrapper>
      <h2 className="signup__title">회원가입</h2>
      <SignupForm>
        <InputSection title="이메일">
          <Input
            value={email.value}
            onChange={email.onChange}
            placeholder="example@email.com"
          />
        </InputSection>
        <InputSection
          title="비밀번호"
          brief="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요"
        >
          <Input
            value={pw.value}
            onChange={pw.onChange}
            placeholder="비밀번호"
            type="password"
          />
        </InputSection>
        <InputSection title="비밀번호 확인">
          <Input
            value={pwConfirm.value}
            onChange={pwConfirm.onChange}
            placeholder="비밀번호 확인"
            type="password"
          />
        </InputSection>
        <InputSection title="이름">
          <Input
            value={name.value}
            onChange={name.onChange}
            placeholder="이름"
          />
        </InputSection>
        <InputSection title="휴대폰 번호" brief="휴대폰 번호를 적어주세요">
          <Input
            value={phone.value}
            onChange={phone.onChange}
            placeholder="010-0000-0000"
          />
        </InputSection>
        <InputSection title="주소" brief="기본 배송지로 저장됩니다">
          <Address onChangeAddress={handleChangeAddress} />
        </InputSection>
        <div className="signup__buttons">
          <Button>취소</Button>
          <Button primary disabled={!address.detailAddress}>
            회원가입
          </Button>
        </div>
      </SignupForm>
    </Wrapper>
  );
};

const SignupForm = styled.form`
  width: 100%;
  max-width: 40rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  .signup__buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5rem;

    button {
      width: 100%;
    }
  }
`;

const Wrapper = styled(PageWrapper)`
  box-sizing: border-box;
  ${({ theme }) => theme.font.small}
  margin: auto;
  padding: 10rem;

  .signup__title {
    width: 100%;
    text-align: center;
    ${({ theme }) => theme.font.xlarge}
  }
`;

export default SignupPage;
