import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/dom";

import MyPage from "./index";

describe("<MyPage />", () => {
  it("should render component in document", () => {
    const { container } = render(<MyPage />);
    expect(container).toBeInTheDocument();
  });
  it("should render content header in MyPage", () => {
    expect(screen.queryByTestId("test__content-header")).toBeInTheDocument();
  });
  it("should render sidebar in MyPage", () => {
    expect(screen.queryByTestId("test__sidebar")).toBeInTheDocument();
  });
  it("should render content area in MyPage", () => {
    expect(screen.queryByTestId("test__content-area")).toBeInTheDocument();
  });
});
