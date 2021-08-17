import { render } from "@/utils/test-util";
import CartPage from "./index";

describe("<CartPage />", () => {
  it("should render component in document", () => {
    const { container } = render(<CartPage />);
    expect(container).toBeInTheDocument();
  });
});
