import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ItemInfoBox, { ItemInfoBoxProps, output } from "./index";

const NAME = "name";

const itemInfoBoxProps: ItemInfoBoxProps = {
  id: 1,
  name: NAME,
  images: [""],
  amount: 1000,
  price: 10000,
  deliveryCost: 2500,
  productOptionId: 0,
  options: [],
};

describe("<ItemInfoBox />", () => {
  const OUTPUT = output(itemInfoBoxProps);

  it("should render component in document", () => {
    const { container } = render(<ItemInfoBox {...itemInfoBoxProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeInTheDocument();
    expect(screen.queryByText(NAME)).toBeInTheDocument();

    expect(screen.queryByText(itemInfoBoxProps.amount)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.priceOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.deliveryOutput)).toBeInTheDocument();
  });
});
