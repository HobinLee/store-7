import { DestinationType } from "@/shared/type";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import AddressBox, { AddressBoxProps } from "./index";

const ADDRESS: DestinationType = {
  id: 1,
  name: "addressName",
  detailAddress: "detailAddress",
  postCode: "1234",
  address: "postcodeAddress",
  addressee: "addressee",
  phoneNumber: "1234",
  isDefault: true,
};

const addressBoxProps: AddressBoxProps = {
  setPage: () => {},
  address: ADDRESS,
  setAddress: () => {},
  closeModal: () => {},
  isChecked: false,
  handleCheck: () => {},
};

describe("<AddressBox />", () => {
  it("should render component in document", () => {
    const { container } = render(<AddressBox {...addressBoxProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(ADDRESS.name)).toBeInTheDocument();
    expect(screen.queryByText(ADDRESS.detailAddress)).toBeInTheDocument();

    expect(screen.queryByText("삭제")).toBeInTheDocument();
    expect(screen.queryByText("수정")).toBeInTheDocument();
    expect(screen.queryByText("선택")).toBeInTheDocument();
  });
});
