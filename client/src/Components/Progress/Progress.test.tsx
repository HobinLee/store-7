import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Progress, { output, ProgressProps } from "./index";

const NUMBER = Math.floor(Math.random() * 10) + 1;

const progressProps: ProgressProps = {
  content: {
    value: NUMBER,
    count: NUMBER,
    totalCount: NUMBER,
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
