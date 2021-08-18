import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Question from "./index";

describe("<Question />", () => {
  it("should render component in document", () => {
    const { container } = render(<Question />);

    expect(container).toBeInTheDocument();
  });
});
