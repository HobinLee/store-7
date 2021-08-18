import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Order, { OrderProps } from "./index";

const OrderProps: OrderProps = {
  orderDate: new Date(),
  orderNumber: "20240124729",
};

describe("<Order />", () => {
  it("should render component in document", () => {
    const { container } = render(<Order {...OrderProps} />);

    expect(container).toBeInTheDocument();
  });
});
