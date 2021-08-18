import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import WistList from "./index";

describe("<WistList />", () => {
  it("should render component in document", () => {
    const { container } = render(<WistList />);

    expect(container).toBeInTheDocument();
  });
});
