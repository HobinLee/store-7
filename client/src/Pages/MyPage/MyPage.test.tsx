import { render } from "@testing-library/react";
import "jest-styled-components";

import MyPage from "./index";

describe("<MyPage />", () => {
  it("should render component in document", () => {
    const { container } = render(<MyPage />);
    expect(container).toBeInTheDocument();
  });
});
