import { useState } from "react";
import styled from "styled-components";
import { AddressType, UserType } from "@/shared/type";
import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";
import InputSection from "@/Components/Input/InputSection";
import ValidationInput from "@/Components/Input/ValidationInput";
import Address from "@/Components/Address";

import { validatePhoneNumber, VALIDATION_ERR_MSG } from "@/utils/validations";

export type AddressFormProps = {
  address?: AddressType;
  user?: UserType;
};

const AddressForm = ({ address: addressToEdit, user }: AddressFormProps) => {
  const name = useInput("");
  const nameValidation = useValidation((name: string) => !!name.length);
  const addressName = useInput("");
  const addressNameValidation = useValidation(
    (addressName: string) => !!addressName.length
  );
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
    //TODO: API 요청 보낸 후 리디렉션
  };

  const isSubmittable =
    nameValidation.isValid &&
    phoneValidation.isValid &&
    addressNameValidation.isValid &&
    !!address.postcode.postcode;

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <InputSection title="배송지명">
          <ValidationInput
            input={addressName}
            validation={addressNameValidation}
            placeholder="배송지명을 입력해주세요"
            message={VALIDATION_ERR_MSG.INVALID_ADDRESS_NAME}
          />
        </InputSection>
        <InputSection title="받는 사람">
          <ValidationInput
            input={name}
            validation={nameValidation}
            placeholder="이름"
            message={VALIDATION_ERR_MSG.INVALID_NAME}
          />
        </InputSection>
        <InputSection title="연락처" brief="휴대폰 번호를 적어주세요">
          <ValidationInput
            input={phone}
            validation={phoneValidation}
            placeholder="010-0000-0000"
            message={VALIDATION_ERR_MSG.INVALID_PHONE}
          />
        </InputSection>
        <InputSection title="주소">
          <Address onChangeAddress={handleChangeAddress} />
        </InputSection>

        <div className="save-btn">
          <Button type="submit" size="large" primary disabled={!isSubmittable}>
            저장
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  ${({ theme }) => theme.font.medium};
  overflow-y: scroll;
  margin-bottom: 5rem;

  .name {
    ${({ theme }) => theme.font.large};
  }
  .user {
    color: ${({ theme }) => theme.color.line};
  }
`;

const Form = styled.form`
  max-width: 40rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  .save-btn {
    position: absolute;
    padding: 2rem;
    background: #fff;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
  }
`;

export default AddressForm;
