import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";

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

    // children 체크
    const children = screen.queryByText("children");
    expect(children).toBeInTheDocument();

    // 클릭 이벤트 체크
    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
