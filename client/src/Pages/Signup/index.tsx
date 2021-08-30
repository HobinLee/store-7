import { useState, useEffect } from "react";
import { Link, moveTo } from "@/Router";

import styled from "styled-components";
import { PageWrapper } from "@/shared/styled";
import { gap } from "@/styles/theme";

import { DestinationType, AddressType } from "@/shared/type";

import {
  validateEmail,
  validatePW,
  validatePhoneNumber,
  VALIDATION_ERR_MSG,
} from "@/utils/validations";
import { convertToNumber, convertToPhoneNumber } from "@/utils/util";

import { checkEmailExist, signup } from "@/api/users";

import { useInput, useValidation } from "@/hooks";
import Address from "@/Components/Address";
import InputSection from "@/Components/Common/Input/InputSection";
import Button from "@/Components/Common/Button";
import ValidationInput from "@/Components/Common/Input/ValidationInput";
import APIButton from "@/Components/Common/Button/APIButton";

import { useRecoilState } from "recoil";
import { loginState } from "@/store/state";

const SignupPage = () => {
  const email = useInput("");
  const emailValidation = useValidation(validateEmail);
  const pw = useInput("");
  const pwValidation = useValidation(validatePW);
  const pwConfirm = useInput("");
  const confirmValidation = useValidation((confirm) => pw.value === confirm);
  const name = useInput("");
  const nameValidation = useValidation((name: string) => !!name.length);
  const phoneNumber = useInput("", convertToPhoneNumber);
  const phoneValidation = useValidation(validatePhoneNumber);
  const [isLoggedIn, setLoginState] = useRecoilState(loginState);
  const [isExist, setIsExist] = useState(-1);

  useEffect(() => {
    if (isLoggedIn) moveTo("/");
  }, []);

  const [address, setAddress] = useState<AddressType>({
    address: "",
    postCode: "",
    detailAddress: "",
  });

  const handleChangeAddress = (address: DestinationType) => {
    setAddress(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({
        email: email.value,
        password: pw.value,
        name: name.value,
        phoneNumber: convertToNumber(phoneNumber.value),
        address,
      });

      setLoginState(true);
      moveTo("/");
    } catch (e) {}
  };

  const handleCheckEmail = async () => {
    const { isExist } = await checkEmailExist(email.value);
    if (isExist) emailValidation.setIsValid(!isExist);
    setIsExist(isExist ? 1 : 0);
  };

  const handleEmailInput = () => {
    emailValidation.setIsValid(true);
    setIsExist(-1);
  };

  const isSubmittable =
    isExist === 0 &&
    emailValidation.isValid &&
    pwValidation.isValid &&
    confirmValidation.isValid &&
    nameValidation.isValid &&
    phoneValidation.isValid &&
    !!address.postCode;
  return (
    !isLoggedIn && (
      <Wrapper>
        <h2 className="signup__title">회원가입</h2>
        <SignupForm onSubmit={handleSubmit}>
          <InputSection title="이메일">
            <div
              className={
                isExist >= 0
                  ? isExist
                    ? "signup__email-check invalid"
                    : "signup__email-check valid"
                  : "signup__email-check"
              }
            >
              <ValidationInput
                input={email}
                validation={emailValidation}
                placeholder="이메일을 입력해주세요"
                onChange={handleEmailInput}
                message={
                  isExist > 0
                    ? VALIDATION_ERR_MSG.DUPLICATE_EMAIL
                    : VALIDATION_ERR_MSG.INVALID_EMAIL
                }
              />
              <APIButton
                size="small"
                api={handleCheckEmail}
                disabled={!emailValidation.isValid}
              >
                중복확인
              </APIButton>
            </div>
          </InputSection>
          <InputSection
            title="비밀번호"
            brief="2종류 이상의 알파벳, 숫자, 문자 조합이 10자 이상으로 이루어져있어야 합니다"
          >
            <ValidationInput
              input={pw}
              validation={pwValidation}
              placeholder="비밀번호"
              type="new-password"
              message={VALIDATION_ERR_MSG.INVALID_PW}
            />
          </InputSection>
          <InputSection title="비밀번호 확인">
            <ValidationInput
              input={pwConfirm}
              validation={confirmValidation}
              placeholder="비밀번호 확인"
              type="new-password"
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
              input={phoneNumber}
              validation={phoneValidation}
              placeholder="010-0000-0000"
              message={VALIDATION_ERR_MSG.INVALID_PHONE}
              filter={convertToPhoneNumber}
            />
          </InputSection>
          <InputSection title="주소" brief="기본 배송지로 저장됩니다">
            <Address onChangeAddress={handleChangeAddress} />
          </InputSection>
          <div className="signup__buttons">
            <Link to="/">
              <Button size="large">취소</Button>
            </Link>

            <APIButton
              type="submit"
              size="large"
              primary
              api={handleSubmit}
              disabled={!isSubmittable}
              isDestroyed={true}
            >
              회원가입
            </APIButton>
          </div>
        </SignupForm>
      </Wrapper>
    )
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
  ${gap("3rem", "column")}

  .signup__buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    ${gap("2rem")}

    a {
      width: 100%;
    }
  }

  .signup__email-check {
    display: flex;
    flex-direction: row;
    ${gap("2rem")}

    button {
      width: 16rem;
      height: 4rem;
      transition: 0.5s;
    }
  }
  .valid {
    input {
      border: 2px solid ${({ theme }) => theme.color.primary1};
    }
    button {
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.primary1};
      border: none;
    }
  }

  .invalid {
    input {
      border: 2px solid ${({ theme }) => theme.color.error_color};
    }
    button {
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.error_color};
      border: none;
    }
  }
`;

export default SignupPage;
