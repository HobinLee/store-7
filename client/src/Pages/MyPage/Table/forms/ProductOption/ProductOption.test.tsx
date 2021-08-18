import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ProductOption, { ProductOptionProps } from "./index";
import { IMAGE_DUMMY } from "@/shared/dummy";

const ProductOptionProps: ProductOptionProps = {
  image: IMAGE_DUMMY,
  name: "testName",
  id: 1,
};

describe("<ProductOption />", () => {
  it("should render component in document", () => {
    const { container } = render(<ProductOption {...ProductOptionProps} />);

    expect(container).toBeInTheDocument();
  });
});
