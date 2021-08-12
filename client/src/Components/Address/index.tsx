import React, { MouseEventHandler, ReactChild } from "react";
import styled from "styled-components";
import PopupPostcode from "./Popup";
import useInput from "@/hooks/useInput";
import { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import { AddressType, PostcodeType } from "@/shared/type";

export type ChangeAddressHandler = (address: AddressType) => {};

const Address = ({ onChangeAddress }) => {
  const [isPopupOpen, setPopup] = useState(false);
  const [address, setAddress] = useState<PostcodeType>({});
  const addressDetail = useInput("");

  const handleSearchAddress = (postData: PostcodeType) => {
    setAddress(postData);
    handleClosePopup();
  };

  const handleOpenPopup = () => {
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  const handleChangeDetail = () => {
    const addressData: AddressType = {
      postcode: address,
      detailAddress: addressDetail.value,
    };

    onChangeAddress(addressData);
  };

  useEffect(handleChangeDetail, [address, addressDetail.value]);

  return (
    <AddressWrapper>
      <div className="address-search" onClick={handleOpenPopup}>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
        <div className="address-search__upper">
          <button className="address-search__button">주소 찾기</button>
          <input disabled value={address.postcode ?? ""} />
        </div>
        <input disabled value={address.address ?? ""} />
      </div>
      <input
        placeholder="상세주소 입력"
        value={addressDetail.value}
        disabled={!address.address}
        onChange={addressDetail.onChange}
      />
      {isPopupOpen && (
        <ModalWrapper closeModal={handleClosePopup}>
          <PopupPostcode onComplete={handleSearchAddress} />
        </ModalWrapper>
      )}
    </AddressWrapper>
  );
};

export default Address;

const AddressWrapper = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ theme }) => theme.borderRadius.small}

  input {
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    padding: 1rem 1.5rem;
    ${({ theme }) => theme.font.medium}
    border: 1px solid ${({ theme }) => theme.color.light_grey2};

    &:disabled {
      background: ${({ theme }) => theme.color.background};
    }

    &:focus {
      background: none;
      border: 3px solid ${({ theme }) => theme.color.primary2};
    }

    ::placeholder {
      color: ${({ theme }) => theme.color.light_grey2};
    }
  }

  .address-search {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__upper {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
    input {
      width: 100%;
    }
  }

  button {
    width: 17rem;
    padding: 0.5rem 1rem;
    ${({ theme }) => theme.font.medium}
    color: ${({ theme }) => theme.color.primary1};
    background: none;
    border: 1px solid ${({ theme }) => theme.color.primary1};
    ${({ theme }) => theme.borderRadius.small}
    transition: background-color 0.5s;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.color.background};
    }
  }
`;
