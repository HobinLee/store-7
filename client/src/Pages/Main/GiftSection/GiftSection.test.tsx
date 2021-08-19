import { render } from "@/utils/test-util";
import GiftSection from "./index";

describe("<ProductSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<GiftSection />);
    expect(container).toBeInTheDocument();
  });
});
