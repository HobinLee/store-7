import { render } from "@/utils/test-util";
import ProductSection from "./index";

const ProductSectionPros = {
  title: "product-section-test",
};

describe("<ProductSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<ProductSection {...ProductSectionPros} />);
    expect(container).toBeInTheDocument();
  });
});
