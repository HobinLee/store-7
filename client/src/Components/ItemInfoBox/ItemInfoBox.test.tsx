import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ItemInfoBox, { ItemInfoBoxProps, output } from "./index";

const NAME = "name";

const itemInfoBoxProps: ItemInfoBoxProps = {
  name: NAME,
  images: [""],
  amount: 1000,
  price: 10000,
  deliveryCost: 2500,
};

describe("<ItemInfoBox />", () => {
  const OUTPUT = output(itemInfoBoxProps);

  it("should render component in document", () => {
    const { container } = render(<ItemInfoBox {...itemInfoBoxProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeInTheDocument();
    expect(screen.queryByText(NAME)).toBeInTheDocument();

    expect(screen.queryByText(OUTPUT.numOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.priceOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.deliveryOutput)).toBeInTheDocument();
  });
});
