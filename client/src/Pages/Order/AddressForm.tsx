import { useState } from "react";
import styled from "styled-components";
import { AddressType, DestinationType } from "@/shared/type";
import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";
import InputSection from "@/Components/Input/InputSection";
import ValidationInput from "@/Components/Input/ValidationInput";
import Address from "@/Components/Address";

import { validatePhoneNumber, VALIDATION_ERR_MSG } from "@/utils/validations";
import { gap } from "@/styles/theme";
import { patchDestination, postDestination } from "@/api/destinations";

type AddressFormProps = {
  addressToEdit?: DestinationType;
  gotoBack: Function;
  refetch: Function;
};

const AddressForm = ({
  addressToEdit,
  gotoBack,
  refetch,
}: AddressFormProps) => {
  const addressee = useInput(addressToEdit?.addressee || "");
  const nameValidation = useValidation((name: string) => !!name.length);
  const addressName = useInput(addressToEdit?.name || "");
  const addressNameValidation = useValidation(
    (addressName: string) => !!addressName.length
  );
  const phone = useInput(addressToEdit?.phoneNumber || "");
  const phoneValidation = useValidation(validatePhoneNumber);

  const [address, setAddress] = useState<AddressType>({
    address: addressToEdit?.address || "",
    postCode: addressToEdit?.postCode || "",
    detailAddress: addressToEdit?.detailAddress || "",
  });

  const handleChangeAddress = (address: DestinationType) => {
    setAddress(address);
  };

  const handleSubmit = async () => {
    try {
      if (!addressToEdit) {
        await postDestination({
          data: {
            ...address,
            name: addressName.value,
            addressee: addressee.value,
            phoneNumber: phone.value,
          },
        });
      } else {
        await patchDestination({
          id: addressToEdit.id,
          data: {
            ...address,
            name: addressName.value,
            addressee: addressee.value,
            phoneNumber: phone.value,
            isDefault: addressToEdit.isDefault,
          },
        });
      }
    } catch (error) {
    } finally {
      gotoBack();
      refetch();
    }
  };

  const isSubmittable =
    nameValidation.isValid &&
    phoneValidation.isValid &&
    addressNameValidation.isValid &&
    !!address.postCode;

  return (
    <Wrapper>
      <Form>
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
            input={addressee}
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
          <Address
            onChangeAddress={handleChangeAddress}
            defaultAddress={address}
          />
        </InputSection>

        <div className="save-btn">
          <Button
            onClick={handleSubmit}
            size="large"
            primary
            disabled={!isSubmittable}
          >
            저장
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${gap("1rem", "column")}
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

const Form = styled.div`
  max-width: 40rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${gap("3rem", "column")}
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
