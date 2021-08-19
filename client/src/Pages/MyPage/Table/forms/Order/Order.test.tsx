import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Order, { OrderProps } from "./index";
import { expectText } from "@/utils/test-util";
import { YYYYMMDD } from "@/utils/util";

const OrderProps: OrderProps = {
  orderDate: new Date(),
  orderNumber: "20240124729",
};

describe("<Order />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Order {...OrderProps} />);
    page = container;
  });
  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });

  it("should render text in document", () => {
    expectText(OrderProps.orderNumber);
    expectText(YYYYMMDD(OrderProps.orderDate));
  });
});
