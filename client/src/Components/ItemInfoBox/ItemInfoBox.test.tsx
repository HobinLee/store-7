import { render } from "@/utils/test-util";
import { convertToKRW } from "@/utils/util";
import { screen } from "@testing-library/react";

import ItemInfoBox, { ItemInfoBoxProps } from "./index";

const ItemInfoBoxProps: ItemInfoBoxProps = {
  name: "name",
  thumbnail: "",
  num: Math.floor(Math.random() * 10000),
  price: Math.floor(Math.random() * 10000),
  delivery: Math.floor(Math.random() * 10000),
};

describe("<ItemInfoBox />", () => {
  it("should render component in document", () => {
    const { container } = render(<ItemInfoBox {...ItemInfoBoxProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();

    expect(screen.getByText(`${ItemInfoBoxProps.num}개`)).toBeInTheDocument();
    expect(
      screen.queryByText(`총 ${convertToKRW(ItemInfoBoxProps.price)}`)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(`배송비 ${convertToKRW(ItemInfoBoxProps.delivery)}`)
    ).toBeInTheDocument();
  });
});
