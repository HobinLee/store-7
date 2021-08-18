import { render } from "@/utils/test-util";
import ReviewSection from "./index";

describe("<ReviewSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<ReviewSection />);
    expect(container).toBeInTheDocument();
  });
});
