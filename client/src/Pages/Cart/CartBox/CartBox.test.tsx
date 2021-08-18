import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import CartBox, { CartBoxProps, output } from "./index";

const CartBoxProps: CartBoxProps = {
  totalPrice: 20000,
  totalDelivery: 30000,
  totalPayment: 50000,
  totalCount: 3,
};

describe("<CartBox />", () => {
  const OUTPUT = output(CartBoxProps);

  it("should render component in document", () => {
    const { container } = render(<CartBox {...CartBoxProps} />);
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
