import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import WistList from "./index";
import { sampleProducts } from "@/shared/dummy";

describe("<WistList />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<WistList />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
    expect(screen.queryAllByTestId("test__itme").length).toBe(
      sampleProducts.length
    );
  });
});
