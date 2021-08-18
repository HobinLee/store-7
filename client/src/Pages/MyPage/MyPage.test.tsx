import "jest-styled-components";
import { render } from "@/utils/test-util";
import MyPage from "./index";

describe("<MyPage />", () => {
  it("should render component in document", () => {
    const { container } = render(<MyPage />);
    expect(container).toBeInTheDocument();
  });
});
