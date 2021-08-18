import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Button, { ButtonProps } from "./index";

const CHILDREN = "children";

const buttonProps: ButtonProps = {
  children: <div>{CHILDREN}</div>,
};

describe("<Button />", () => {
  it("should render component in document", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Button {...buttonProps} onClick={handleClick} />
    );
    expect(container).toBeInTheDocument();

    // children 체크
    const children = screen.queryByText(CHILDREN);
    expect(children).toBeInTheDocument();

    // 클릭 이벤트 체크
    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("when disabled", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Button {...buttonProps} onClick={handleClick} disabled />
    );
    expect(container).toBeInTheDocument();

    // disabled이면 클릭 안됨
    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
