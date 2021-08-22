import { PageWrapper } from "@/shared/styled";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import useInput from "@/hooks/useInput";
import AddressModal from "./AddressModal";
import ItemInfoBox from "@/Components/ItemInfoBox";
import { Arrow, KakaoPay } from "@/assets";
import InputSection from "@/Components/Input/InputSection";
import useValidation from "@/hooks/useValidation";
import ValidationInput from "@/Components/Input/ValidationInput";
import {
  validateEmail,
  validatePhoneNumber,
  VALIDATION_ERR_MSG,
} from "@/utils/validations";
import { gap } from "@/styles/theme";
import { useEffect } from "react";
import { useMyDestinations, useMyInfo } from "@/api/my";
import {
  AddressType,
  DestinationType,
  ICart,
  OrderType,
  PartialCart,
} from "@/shared/type";
import { postPaymentReady } from "@/api/payment";
import properties from "@/config/properties";
import CartOrderBox from "../../Components/CartOrderBox";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/state";
import Address from "@/Components/Address";
import { convertToPhoneNumber } from "@/utils/util";
import { postOrder } from "@/api/orders";
import { moveTo } from "@/Router";

const OrderPage = () => {
  const isLogined = useRecoilValue(loginState);

  // 상품목록
  const orderItems: { items: PartialCart[] } = JSON.parse(
    localStorage.getItem("orders")
  );

  const { status: myInfoStatus, data: myInfo, error } = useMyInfo();

  // form
  const email = useInput("");
  const emailValidation = useValidation(validateEmail);
  const addressee = useInput("");
  const nameValidation = useValidation((name: string) => !!name.length);
  const phone = useInput("", convertToPhoneNumber);
  const phoneValidation = useValidation(validatePhoneNumber);

  useEffect(() => {
    email.setValue(myInfo?.email);
    addressee.setValue(myInfo?.name);
    phone.setValue(convertToPhoneNumber(myInfo?.phoneNumber ?? ""));
  }, [myInfoStatus]);

  // 결제수단
  type paymentType = "kakaopay" | "etpay" | null;
  const [payment, setPayment] = useState<paymentType>(null);

  // 비로그인시 배송지
  const [destination, setDestination] = useState<AddressType>({
    address: "",
    postCode: "",
    detailAddress: "",
  });
  const handleChangeAddress = (address: DestinationType) => {
    setDestination(address);
  };

  // 배송지
  const { status: destinationsStatus, data: destinations } =
    useMyDestinations();
  const [address, setAddress] = useState<Partial<DestinationType>>();
  useEffect(() => {
    if (isLogined && destinationsStatus !== "loading")
      setAddress(destinations.find((i) => i.isDefault === true));
  }, [destinations]);
  const [isAddressModalOpened, setIsAddressModalOpened] = useState(false);

  // 요청사항
  const [request, setRequest] = useState("");

  // create order
  const handlePostOrder = () => {
    orderItems.items.forEach(async (item) => {
      await postOrder({
        data: {
          productId: item.productId,
          addressee: addressee.value,
          // productOptionId?: number,
          price: item.price,
          amount: item.amount,
          destination: isLogined
            ? `${address.address} ${address.detailAddress}`
            : `${destination.address} ${destination.detailAddress}`,
          // request,
        },
      });
    });
  };

  // 카카오페이
  const handleKakaoPay = async () => {
    const res = await postPaymentReady({
      cid: "TC0ONETIME",
      item_name: "item",
      quantity: "1",
      total_amount: "11",
      tax_free_amount: "11",
      approval_url: `${properties.baseURL}/payment/approve`,
      cancel_url: properties.baseURL,
      fail_url: properties.baseURL,
    });
    if (res) {
      try {
        handlePostOrder();
      } finally {
        window.open(res.url);
      }
    }
  };

  // 결제 버튼 클릭
  const handlePay = () => {
    if (payment === "kakaopay") handleKakaoPay();
    else {
      try {
        handlePostOrder();
      } finally {
        moveTo("/order/success");
      }
    }
  };

  const isOrderable =
    emailValidation.isValid &&
    nameValidation.isValid &&
    phoneValidation.isValid &&
    !!payment &&
    ((isLogined && !!address) || !!destination.postCode);

  useEffect(() => {
    console.log("isOrderable", isOrderable);
  }, [isOrderable]);

  return (
    <Wrapper>
      <Header>
        <CartOrderBox {...{ handlePay }} isButtonDisabled={!isOrderable} />
      </Header>
      <div className="contents">
        <Title>
          <span className="other">장바구니</span> <Arrow /> 주문/결제
        </Title>

        <Content>
          <Info>
            <div className="label">주문상품</div>
            <div className="items">
              {orderItems.items.map((cart) => (
                <ItemInfoBox key={cart.id} {...(cart as ICart)} />
              ))}
            </div>
          </Info>

          <Info>
            <div className="label">주문자</div>
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
              <InputSection
                title="휴대폰 번호"
                brief="휴대폰 번호를 적어주세요"
              >
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
              {isLogined && (
                <div
                  className="address-btn"
                  onClick={() => setIsAddressModalOpened(true)}
                >
                  변경
                </div>
              )}
            </div>

            <div className="address-info">
              {isLogined ? (
                address ? (
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
                )
              ) : (
                <Address onChangeAddress={handleChangeAddress} />
              )}

              <div style={{ marginTop: "3rem" }}>
                <select className="order-input" value={request}>
                  <option value="배송시 요청사항을 선택해주세요.">
                    배송시 요청사항을 선택해주세요.
                  </option>
                  <option value="부재시 문 앞에 놓아주세요.">
                    부재시 문 앞에 놓아주세요.
                  </option>
                  <option value="배송전에 미리 연락주세요.">
                    배송전에 미리 연락주세요.
                  </option>
                  <option value="부재시 경비실에 맡겨주세요.">
                    부재시 경비실에 맡겨주세요.
                  </option>
                  <option value="부재시 전화주시거나 문자 남겨 주세요.">
                    부재시 전화주시거나 문자 남겨 주세요.
                  </option>
                  {/* <option>직접입력</option> */}
                </select>
              </div>
            </div>
          </Info>

          <Info>
            <div className="label">결제수단</div>

            <div className="payments">
              <Payment
                className="payments__item"
                onClick={() => setPayment("kakaopay")}
                isClicked={payment === "kakaopay"}
              >
                <img width={70} src={KakaoPay} />
                <div>카카오페이</div>
              </Payment>
              <Payment
                className="payments__item"
                onClick={() => setPayment("etpay")}
                isClicked={payment === "etpay"}
              >
                <img width={70} src={KakaoPay} />
                <div>ET페이</div>
              </Payment>
            </div>
          </Info>
        </Content>
      </div>
      <Footer />
      {isAddressModalOpened && (
        <AddressModal
          {...{ setAddress, address }}
          closeModal={() => setIsAddressModalOpened(false)}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
    ${({ theme }) => theme.flexCenter}
    flex-direction: column;
    padding: 0 10rem;
  }
  select {
    cursor: pointer;
  }
  .order-input {
    width: 37rem;
    border: 0.1rem solid ${({ theme }) => theme.color.line};
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
  }
  .info-input {
    ${({ theme }) => theme.flexCenter};
    justify-content: start;
    :not(:first-child) {
      margin-top: 2rem;
    }
    label {
      width: 7rem;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  ${({ theme }) => theme.font.xlarge}
  .other {
    color: ${({ theme }) => theme.color.grey2};
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  padding-right: 43rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${gap("8rem", "column")}
  margin: 4rem 0;
`;

const Info = styled.div`
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
  }
`;

const Payment = styled.div<{ isClicked: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  border: 0.2rem solid
    ${({ theme, isClicked }) =>
      isClicked ? theme.color.primary1 : theme.color.line};
`;

export default OrderPage;
