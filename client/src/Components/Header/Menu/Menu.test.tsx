import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Menu from "./index";

describe("<Menu />", () => {
  it("should render component in document", () => {
    const { container } = render(<Menu />);
    expect(container).toBeInTheDocument();
  });
});
