import { useState, useEffect } from "react";
import styled from "styled-components";
import InputSection from "@/Components/Input/InputSection";
import Section from "../../../Section";
import ValidationInput from "@/Components/Input/ValidationInput";
import { gap, media } from "@/styles/theme";
import { useMyDestinations, useMyInfo } from "@/api/my";
import useInput from "@/hooks/useInput";
import { convertToPhoneNumber } from "@/utils/util";
import {
  validateEmail,
  validatePhoneNumber,
  VALIDATION_ERR_MSG,
} from "@/utils/validations";
import useValidation from "@/hooks/useValidation";
import { DestinationType } from "@/shared/type";

const UserInfo = () => {
  const { status: myInfoStatus, data: myInfo, error } = useMyInfo();

  // form
  const email = useInput(myInfo?.email ?? "");
  const addressee = useInput(myInfo?.name ?? "");
  const phone = useInput(convertToPhoneNumber(myInfo?.phoneNumber ?? ""));
  const emailValidation = useValidation(validateEmail);
  const nameValidation = useValidation((name: string) => !!name?.length);
  const phoneValidation = useValidation(validatePhoneNumber);

  useEffect(() => {
    if (myInfo) {
      email.setValue(myInfo?.email);
      addressee.setValue(myInfo?.name);
      phone.setValue(convertToPhoneNumber(myInfo?.phoneNumber));
      emailValidation.onCheck(myInfo?.email ?? "");
      nameValidation.onCheck(myInfo?.name ?? "");
      phoneValidation.onCheck(convertToPhoneNumber(myInfo?.phoneNumber ?? ""));
    }
  }, [myInfo]);

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
    <Wrapper data-testid="test__userinfo">
      <Section
        title="회원정보 변경"
        description="회원 정보를 변경/수정할 수 있습니다."
      >
        <Info>
          <div className="user-info">
            <InputSection title="이름">
              <ValidationInput
                input={addressee}
                validation={nameValidation}
                placeholder="이름"
                message={VALIDATION_ERR_MSG.INVALID_NAME}
              />
            </InputSection>
            <InputSection title="이메일">
              <ValidationInput
                input={email}
                validation={emailValidation}
                placeholder="이메일을 입력해주세요"
                message={VALIDATION_ERR_MSG.INVALID_EMAIL}
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
          </div>
        </Info>

        <Info>
          <div className="label">
            배송지
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
                <div className="name">{address?.name}</div>
                <div>
                  {address?.addressee} {address?.phoneNumber}
                </div>
                <div>
                  {address?.address} {address?.detailAddress}
                </div>
              </>
            ) : (
              <div>배송지를 추가해주세요</div>
            )}
          </div>
        </Info>
      </Section>
    </Wrapper>
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
    ${({ theme }) => theme.flexCenter};
    ${({ theme }) => theme.font.large};
    width: 100%;
    justify-content: space-between;
    padding-bottom: 2rem;
    margin: 2rem 0;
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${gap("3rem", "column")}
    width: 30rem;
  }
  div {
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
    .name {
      ${({ theme }) => theme.font.large};
    }
  }
  .address-btn {
    cursor: pointer;
    :hover {
      font-weight: bolder;
      color: ${({ theme }) => theme.color.primary1};
    }
  }
  .payments {
    display: flex;
    ${gap("1rem")}
    &__item {
      background: #fff;
    }
  }
`;

export default UserInfo;
