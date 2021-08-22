import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import CartBox, { CartBoxInput, output } from "./index";

const cartBoxInput: CartBoxInput = {
  totalPrice: 20000,
  totalDelivery: 30000,
  totalPayment: 50000,
  totalCount: 3,
};

describe("<CartBox />", () => {
  const OUTPUT = output(cartBoxInput);

  it("should render component in document", () => {
    const { container } = render(<CartBox />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("총 상품금액")).toBeInTheDocument();
    expect(screen.queryByText("총 배송비")).toBeInTheDocument();
    expect(screen.queryByText("결제금액")).toBeInTheDocument();

    expect(screen.queryByText(OUTPUT.priceOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.deliveryOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.paymentOutput)).toBeInTheDocument();

    expect(screen.queryByRole("button").innerHTML).toBe(OUTPUT.buttonText);
  });
});
