import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import UserInfo from "./index";

describe("<UserInfo />", () => {
  it("should render component in document", () => {
    const { container } = render(<UserInfo />);

    expect(container).toBeInTheDocument();
  });
});
