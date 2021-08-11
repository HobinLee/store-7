import React from "react";
import DaumPostcode from "react-daum-postcode";

export type PostcodeType = {
  postcode?: number;
  address?: string;
};

const getFullAddress = (data): string => {
  const ROAD_ADDRESS = "R";

  let fullAddress = data.address;
  let extraAddress = "";

  if (data.addressType === ROAD_ADDRESS) {
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      extraAddress +=
        extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }

  return fullAddress;
};

const PopupPostcode = ({ onComplete }) => {
  const handleComplete = (data) => {
    const sendData: PostcodeType = {
      postcode: data.zonecode,
      address: getFullAddress(data),
    };

    onComplete(sendData);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default PopupPostcode;
