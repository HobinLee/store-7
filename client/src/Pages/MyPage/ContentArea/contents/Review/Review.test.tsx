import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Review from "./index";

describe("<Review />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Review />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });
});
