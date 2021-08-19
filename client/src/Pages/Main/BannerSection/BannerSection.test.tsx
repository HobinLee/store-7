import { render } from "@/utils/test-util";
import BannerSection from "./index";

describe("<ProductSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<BannerSection />);
    expect(container).toBeInTheDocument();
  });
});
