import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import AddressForm, { AddressFormProps } from "./index";

const ADDRESS = {
  name: "addressName",
  detailAddress: "detailAddress",
  postcode: {
    postcode: 1234,
    address: "postcodeAddress",
  },
};
const USER = {
  name: "userName",
  phone: "phone",
  email: "email",
  image: "image",
  addresses: [],
  defaultDestinationId: 1234,
};

const AddressFormProps: AddressFormProps = {
  address: ADDRESS,
  user: USER,
};

describe("<Progress />", () => {
  it("should render component in document", () => {
    const { container } = render(<AddressForm {...AddressFormProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("배송지명")).toBeInTheDocument();
    expect(screen.queryByText("받는 사람")).toBeInTheDocument();
    expect(screen.queryByText("연락처")).toBeInTheDocument();
    expect(screen.queryByText("주소")).toBeInTheDocument();
    expect(screen.queryByText("저장")).toBeInTheDocument();
  });
});
