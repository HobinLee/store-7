import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Review from "./index";

describe("<Review />", () => {
  it("should render component in document", () => {
    const { container } = render(<Review />);

    expect(container).toBeInTheDocument();
  });
});
