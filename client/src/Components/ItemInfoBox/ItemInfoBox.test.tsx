import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ItemInfoBox, { ItemInfoBoxProps, output } from "./index";

const NAME = "name";
const NUMBER = Math.floor(Math.random() * 10000);

const itemInfoBoxProps: ItemInfoBoxProps = {
  name: NAME,
  thumbnail: "",
  num: NUMBER,
  price: NUMBER,
  delivery: NUMBER,
};

describe("<ItemInfoBox />", () => {
  const OUTPUT = output(itemInfoBoxProps);

  it("should render component in document", () => {
    const { container } = render(<ItemInfoBox {...itemInfoBoxProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(NAME)).toBeInTheDocument();

    expect(screen.getByText(OUTPUT.numOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.priceOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.deliveryOutput)).toBeInTheDocument();
  });
});
