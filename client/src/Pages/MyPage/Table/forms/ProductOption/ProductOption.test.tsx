import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ProductOption, { ProductOptionProps } from "./index";
import { IMAGE_DUMMY } from "@/shared/dummy";
import { expectText } from "@/utils/test-util";

const ProductOptionProps: ProductOptionProps = {
  image: IMAGE_DUMMY,
  name: "testName",
  id: 1,
};

describe("<ProductOption />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<ProductOption {...ProductOptionProps} />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });

  it("should render text in document", () => {
    expectText(ProductOption.name);
  });
});
