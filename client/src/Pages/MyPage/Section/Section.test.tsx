import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Section, { SectionProps } from "./index";
import { expectText } from "@/utils/test-util";

const SectionProps: SectionProps = {
  title: "test title",
  description: "test description",
  children: <div data-testid="test__children">children</div>,
};

describe("<Section />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Section {...SectionProps} />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
    expect(screen.queryByTestId("test__children")).toBeInTheDocument();
  });

  it("should render text in document", () => {
    expectText(SectionProps.title);
    expectText(SectionProps.description);
  });
});
