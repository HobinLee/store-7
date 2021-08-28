import { useState, useEffect } from "react";
import styled from "styled-components";
import InputSection from "@/Components/Common/Input/InputSection";
import Section from "../../../Section";
import ValidationInput from "@/Components/Common/Input/ValidationInput";
import { gap } from "@/styles/theme";
import { patchMe, useMyDestinations, useMyInfo } from "@/api/my";
import useInput from "@/hooks/useInput";
import { convertToNumber, convertToPhoneNumber } from "@/utils/util";
import { validatePhoneNumber, VALIDATION_ERR_MSG } from "@/utils/validations";
import useValidation from "@/hooks/useValidation";
import { DestinationType } from "@/shared/type";
import AddressModal from "@/Pages/Order/AddressModal";
import APIButton from "@/Components/Common/Button/APIButton";

const UserInfo = () => {
  const { status: myInfoStatus, data: myInfo, error } = useMyInfo();

  // form
  const name = useInput(myInfo?.name ?? "");
  const phone = useInput(myInfo?.phoneNumber ?? "", convertToPhoneNumber);
  const nameValidation = useValidation((name: string) => !!name?.length);
  const phoneValidation = useValidation(validatePhoneNumber);

  useEffect(() => {
    if (myInfo) {
      name.setValue(myInfo?.name);
      phone.setValue(convertToPhoneNumber(myInfo?.phoneNumber));
      nameValidation.onCheck(myInfo?.name ?? "");
      phoneValidation.onCheck(convertToPhoneNumber(myInfo?.phoneNumber ?? ""));
    }
  }, [myInfo]);

  const isEditable = nameValidation.isValid && phoneValidation.isValid;

  const handleEditInfo = async () => {
    await patchMe({
      name: name.value,
      phoneNumber: convertToNumber(phone.value),
    });
  };

  // 배송지
  const { status: destinationsStatus, data: destinations } =
    useMyDestinations();
  const [address, setAddress] = useState<Partial<DestinationType>>();

  useEffect(() => {
    if (destinationsStatus !== "loading")
      setAddress(destinations.find((i) => i.isDefault === true));
  }, [destinations]);

  const [isAddressModalOpened, setIsAddressModalOpened] = useState(false);

  return (
    <>
      <Wrapper data-testid="test__userinfo">
        <Section
          title="회원정보 변경"
          description="회원 정보를 변경/수정할 수 있습니다."
        >
          <Info>
            <div className="user-info">
              <InputSection title="이름">
                <ValidationInput
                  input={name}
                  validation={nameValidation}
                  placeholder="이름"
                  message={VALIDATION_ERR_MSG.INVALID_NAME}
                />
              </InputSection>
              <InputSection title="이메일">
                <input value={myInfo?.email} disabled />
              </InputSection>
              <InputSection title="휴대폰 번호">
                <ValidationInput
                  input={phone}
                  validation={phoneValidation}
                  placeholder="010-0000-0000"
                  message={VALIDATION_ERR_MSG.INVALID_PHONE}
                />
              </InputSection>

              <APIButton
                primary
                size="large"
                disabled={!isEditable}
                api={handleEditInfo}
              >
                저장
              </APIButton>
            </div>
          </Info>

          <Info>
            <div className="label">
              기본 배송지
              <div
                className="address-btn"
                onClick={() => setIsAddressModalOpened(true)}
              >
                변경
              </div>
            </div>

            <div className="address-info">
              {address ? (
                <>
                  <div className="name">
                    <div>{address?.name}</div> <div>{address?.postCode}</div>
                  </div>
                  <div>{address?.address}</div>
                  <div>{address?.detailAddress}</div>
                  <div className="user">
                    {address?.addressee} {address?.phoneNumber}
                  </div>
                </>
              ) : (
                <div>배송지를 추가해주세요</div>
              )}
            </div>
          </Info>
        </Section>
      </Wrapper>
      {isAddressModalOpened && (
        <AddressModal
          {...{ setAddress, address }}
          closeModal={() => setIsAddressModalOpened(false)}
        />
      )}
    </>
  );
};

const Wrapper = styled.div``;

export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${gap("2rem", "column")}
  .label {
    display: flex;
    align-items: flex-end;
    ${({ theme }) => theme.font.large};
    width: 100%;
    margin-top: 7rem;
    margin-bottom: 1rem;
    .address-btn {
      cursor: pointer;
      ${({ theme }) => theme.font.medium};
      margin-left: 1rem;
      :hover {
        font-weight: bolder;
        color: ${({ theme }) => theme.color.primary1};
      }
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${gap("3rem", "column")}
    width: 30rem;
    ${({ theme }) => theme.font.medium};
  }
  .items {
    display: flex;
    flex-direction: column;
    width: 100%;
    ${gap("2rem", "column")}
  }
  .address-info {
    display: flex;
    flex-direction: column;
    ${gap("1rem", "column")}
    ${({ theme }) => theme.font.medium};
    background: #fff;
    padding: 2rem 3rem;
    border-radius: 2rem;
    .name {
      ${({ theme }) => theme.font.large};
      display: flex;
      width: 100%;
      justify-content: space-between;
      ${({ theme }) => theme.font.large};
      &:last-child {
        color: ${({ theme }) => theme.color.primary1};
      }
    }
    .user {
      color: ${({ theme }) => theme.color.line};
    }
  }
`;

export default UserInfo;
