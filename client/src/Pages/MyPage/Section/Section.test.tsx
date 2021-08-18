import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Section, { SectionProps } from "./index";

const SectionProps: SectionProps = {
  title: "test title",
  description: "test description",
  children: <div>children</div>,
  lineType: "long1",
};

describe("<Section />", () => {
  it("should render component in document", () => {
    const { container } = render(<Section {...SectionProps} />);

    expect(container).toBeInTheDocument();
  });
});
