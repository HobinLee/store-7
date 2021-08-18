import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ModalWrapper, { ModalWrapperProps } from "./index";

const CHILDREN = "children";
const TILTE = "title";

const modalWrapperProps: ModalWrapperProps = {
  children: <div>{CHILDREN}</div>,
  title: TILTE,
};

describe("<ModalWrapper />", () => {
  it("closeBtn 없음", () => {
    const { container } = render(
      <ModalWrapper hideCloseBtn {...modalWrapperProps} />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(TILTE)).toBeInTheDocument();
    expect(screen.queryByText(CHILDREN)).toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("closeBtn 있음", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ModalWrapper closeModal={handleClick} {...modalWrapperProps} />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByText("children")).toBeInTheDocument();

    expect(screen.queryByRole("button")).toBeInTheDocument();

    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
