import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Checkbox, { CheckboxProps } from "./index";

const CheckboxProps: CheckboxProps = {
  label: "label",
  isChecked: false,
};

describe("<Checkbox />", () => {
  it("should render component in document", () => {
    const { container } = render(<Checkbox {...CheckboxProps} />);
    expect(container).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { checked: false })
    ).toBeInTheDocument();

    // label 체크
    const label = screen.queryByText("label");
    expect(label).toBeInTheDocument();

    // 클릭하면 false -> true
    fireEvent.click(screen.queryByRole("button"));
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });
});
