import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Rating from "./index";

describe("<Rating />", () => {
  it("readOnly면 article", () => {
    const { container } = render(<Rating readOnly={true} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByRole("article")).toBeInTheDocument();
  });

  it("readOnly가 아니면 button", () => {
    const { container } = render(<Rating readOnly={false} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeInTheDocument();
  });
});
