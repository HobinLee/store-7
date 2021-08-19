import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import OrderList from "./index";

describe("<OrderList />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<OrderList />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });
});
