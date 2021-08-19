import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import UserInfo from "./index";

describe("<UserInfo />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<UserInfo />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });
});
