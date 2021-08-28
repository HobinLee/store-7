import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Progress, { output, ProgressProps } from "./index";

const progressProps: ProgressProps = {
  content: {
    value: 10000,
    count: 5,
    totalCount: 3,
  },
};

describe("<Progress />", () => {
  const OUTPUT = output(progressProps.content);

  it("should render component in document", () => {
    const { container } = render(<Progress {...progressProps} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.countOutput)).toBeInTheDocument();
    expect(screen.queryByText(OUTPUT.valueOutput)).toBeInTheDocument();
  });
});
