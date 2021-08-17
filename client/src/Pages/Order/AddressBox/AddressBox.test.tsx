import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import AddressBox, { AddressBoxProps } from "./index";

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

const addressBoxProps: AddressBoxProps = {
  setPage: () => {},
  address: ADDRESS,
  user: USER,
};

describe("<Progress />", () => {
  it("should render component in document", () => {
    const { container } = render(<AddressBox {...addressBoxProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(ADDRESS.name)).toBeInTheDocument();
    expect(screen.queryByText(ADDRESS.detailAddress)).toBeInTheDocument();
    expect(screen.queryByText(USER.name)).toBeInTheDocument();
    expect(screen.queryByText(USER.phone)).toBeInTheDocument();

    expect(screen.queryByText("삭제")).toBeInTheDocument();
    expect(screen.queryByText("수정")).toBeInTheDocument();
    expect(screen.queryByText("선택")).toBeInTheDocument();
  });
});
