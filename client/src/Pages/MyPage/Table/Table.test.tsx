import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Table, { TableProps } from "./index";

const TableProps: TableProps = {
  ths: ["test1", "test2", "test3"],
  ratio: [1, 2, 3],
  checker: false,
  children: (
    <tr>
      <td>test td</td>
      <td>test td</td>
      <td>test td</td>
    </tr>
  ),
};

describe("<Table />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Table {...TableProps} />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });

  // it("should render th/td as many as ths.length", () => {
  //   expect(screen.queryAllByRole("th").length).toBe(TableProps.ths.length);

  //   expect(screen.queryAllByRole("td").length).toBe(TableProps.ths.length);
  // });
});
