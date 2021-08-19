import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Empty, { EmptyProps } from "./index";

const EmptyProps: EmptyProps = {
  colSpan: 4,
  message: "test message",
};

describe("<Empty />", () => {
  it("should render component in document", () => {
    const { container } = render(<Empty {...EmptyProps} />);

    expect(container).toBeInTheDocument();
  });
});
