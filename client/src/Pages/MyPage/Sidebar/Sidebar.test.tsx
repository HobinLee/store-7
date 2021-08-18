import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Sidebar, { SidebarProps } from "./index";

const SidebarProps: SidebarProps = {
  setCurrent: (path: string) => {},
};

describe("<Sidebar />", () => {
  it("should render component in document", () => {
    const { container } = render(<Sidebar {...SidebarProps} />);

    expect(container).toBeInTheDocument();
  });
});
