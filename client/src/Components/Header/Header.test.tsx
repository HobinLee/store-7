import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Header from "./index";

describe("<Header />", () => {
  it("should render component in document", () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });
});
