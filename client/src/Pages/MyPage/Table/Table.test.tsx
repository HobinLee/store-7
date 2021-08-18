import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Table, { TableProps } from "./index";

const TableProps: TableProps = {
  ths: ["test1", "test2", "test3"],
  ratio: [1, 2, 3],
  checker: false,
  children: <div>children</div>,
};

describe("<Table />", () => {
  it("should render component in document", () => {
    const { container } = render(<Table {...TableProps} />);

    expect(container).toBeInTheDocument();
  });
});
