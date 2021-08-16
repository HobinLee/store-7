import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Progress, { ProgressProps } from "./index";

const ProgressProps: ProgressProps = {
  content: {
    value: Math.floor(Math.random() * 10) + 1,
    count: Math.floor(Math.random() * 10) + 1,
    totalCount: Math.floor(Math.random() * 10) + 1,
  },
};

describe("<Progress />", () => {
  it("should render component in document", () => {
    const { container } = render(<Progress {...ProgressProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(ProgressProps.content.count)).toBeInTheDocument();
    expect(
      screen.queryByText(`${ProgressProps.content.value}점`)
    ).toBeInTheDocument();
  });
});
