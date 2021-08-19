import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import { UserType } from "@/shared/type";
import AddressForm, { AddressFormProps } from "./index";

const ADDRESS = {
  name: "addressName",
  detailAddress: "detailAddress",
  postCode: "1234",
  address: "postcodeAddress",
};
const USER: UserType = {
  name: "userName",
  phoneNumber: "phone",
  email: "email",
  profile: "image",
  destinations: [],
};

const AddressFormProps: AddressFormProps = {
  address: ADDRESS,
  user: USER,
};

describe("<AddressForm />", () => {
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
