import { render, fireEvent } from "@/utils/test-util";
import { screen, createEvent } from "@testing-library/react";
import "jest-styled-components";

import Button, { ButtonType } from "./index";

const ButtonProps: ButtonType = {
  children: <div>children</div>,
};

describe("<Button />", () => {
  it("should render component in document", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Button {...ButtonProps} onClick={handleClick} />
    );
    expect(container).toBeInTheDocument();
    const children = screen.queryByText("children");
    expect(children).toBeInTheDocument();

    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
