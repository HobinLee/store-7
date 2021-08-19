import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Question from "./index";

describe("<Question />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Question />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });
});
