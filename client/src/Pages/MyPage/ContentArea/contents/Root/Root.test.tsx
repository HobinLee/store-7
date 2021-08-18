import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Root from "./index";

describe("<Root />", () => {
  it("should render component in document", () => {
    const { container } = render(<Root />);

    expect(container).toBeInTheDocument();
  });
});
