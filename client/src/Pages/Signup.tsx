import { PageWrapper } from "@/shared/styled";
import React, { useState } from "react";
import styled from "styled-components";
import { ETLink } from "@/Router";
import Address from "@/Components/Address";
import useInput from "@/hooks/useInput";
import InputSection from "@/Components/Input/InputSection";
import { AddressType, UserType } from "@/shared/type";
import Button from "@/Components/Button";
import useValidation from "@/hooks/useValidation";
import ValidationInput from "@/Components/Input/ValidationInput";
import {
  validateEmail,
  validatePW,
  validatePhoneNumber,
  VALIDATION_ERR_MSG,
} from "@/utils/validations";

const SignupPage = () => {
  const email = useInput("");
  const emailValidation = useValidation(validateEmail);
  const pw = useInput("");
  const pwValidation = useValidation(validatePW);
  const pwConfirm = useInput("");
  const confirmValidation = useValidation((confirm) => pw.value === confirm);
  const name = useInput("");
  const nameValidation = useValidation((name: string) => !!name.length);
  const phone = useInput("");
  const phoneValidation = useValidation(validatePhoneNumber);

  const [address, setAddress] = useState<AddressType>({
    postcode: {},
    detailAddress: "",
  });

  const handleChangeAddress = (address: AddressType) => {
    setAddress(address);
  };

  const handleSubmit = () => {
    const userInfo: UserType = {
      email: email.value,
      name: name.value,
      phone: phone.value,
      image: "",
      addresses: [address],
      defaultDestinationId: 0,
    };

    //TODO: 나중에 DTO 빼기~
    const SignupDTO = {
      ...userInfo,
      pw: pw.value,
    };

    //TODO: API 요청 보낸 후 리디렉션
  };

  const isSubmittable =
    emailValidation.isValid &&
    pwValidation.isValid &&
    confirmValidation.isValid &&
    nameValidation.isValid &&
    phoneValidation.isValid &&
    !!address.postcode.postcode;

  return (
    <Wrapper>
      <h2 className="signup__title">회원가입</h2>
      <SignupForm onSubmit={handleSubmit}>
        <InputSection title="이메일">
          <ValidationInput
            input={email}
            validation={emailValidation}
            placeholder="이메일을 입력해주세요"
            message={VALIDATION_ERR_MSG.INVALID_EMAIL}
          />
        </InputSection>
        <InputSection
          title="비밀번호"
          brief="알파벳, 숫자, 문자 중 2종류 이상의 조합으로 10자 이상으로 이루어져있어야 합니다"
        >
          <ValidationInput
            input={pw}
            validation={pwValidation}
            placeholder="비밀번호"
            type="password"
            message={VALIDATION_ERR_MSG.INVALID_EMAIL}
          />
        </InputSection>
        <InputSection title="비밀번호 확인">
          <ValidationInput
            input={pwConfirm}
            validation={confirmValidation}
            placeholder="비밀번호 확인"
            type="password"
            message={VALIDATION_ERR_MSG.INVALID_CONFIRM}
          />
        </InputSection>
        <InputSection title="이름">
          <ValidationInput
            input={name}
            validation={nameValidation}
            placeholder="이름"
            message={VALIDATION_ERR_MSG.INVALID_NAME}
          />
        </InputSection>
        <InputSection title="휴대폰 번호" brief="휴대폰 번호를 적어주세요">
          <ValidationInput
            input={phone}
            validation={phoneValidation}
            placeholder="010-0000-0000"
            message={VALIDATION_ERR_MSG.INVALID_PHONE}
          />
        </InputSection>
        <InputSection title="주소" brief="기본 배송지로 저장됩니다">
          <Address onChangeAddress={handleChangeAddress} />
        </InputSection>
        <div className="signup__buttons">
          <ETLink to="/">
            <Button>취소</Button>
          </ETLink>

          <Button type="submit" primary disabled={!isSubmittable}>
            회원가입
          </Button>
        </div>
      </SignupForm>
    </Wrapper>
  );
};

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
    a {
      width: 100%;
    }
  }
`;

export default SignupPage;
