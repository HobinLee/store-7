import { render } from "@/utils/test-util";
import ProductSection, { ProductSectionProps } from "./index";

const productSectionPros: ProductSectionProps = {
  title: "product-section-test",
  type: "test",
};

describe("<ProductSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<ProductSection {...productSectionPros} />);
    expect(container).toBeInTheDocument();
  });
});
