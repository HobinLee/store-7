import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ContentArea, { ContentAreaProps } from "./index";

const ContentAreaProps: ContentAreaProps = {
  current: "/",
};

describe("<ContentArea />", () => {
  it("should render component in document", () => {
    const { container } = render(<ContentArea {...ContentAreaProps} />);

    expect(container).toBeInTheDocument();
  });
});
