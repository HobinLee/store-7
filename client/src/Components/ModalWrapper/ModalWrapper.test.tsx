import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import ModalWrapper, { ModalWrapperProps } from "./index";

const ModalWrapperProps: ModalWrapperProps = {
  children: <div>children</div>,
  title: "title",
};

describe("<ModalWrapper />", () => {
  it("closeBtn 없음", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ModalWrapper
        closeModal={handleClick}
        hideCloseBtn
        {...ModalWrapperProps}
      />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByText("children")).toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("closeBtn 있음", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ModalWrapper closeModal={handleClick} {...ModalWrapperProps} />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByText("children")).toBeInTheDocument();

    expect(screen.queryByRole("button")).toBeInTheDocument();

    // 클릭 이벤트 체크
    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
