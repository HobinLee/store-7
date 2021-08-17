import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ModalWrapper, { ModalWrapperProps } from "./index";
import { useCallback } from "react";
import { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks";

const CHILDREN = "children";
const TILTE = "title";

const modalWrapperProps: ModalWrapperProps = {
  children: <div>{CHILDREN}</div>,
  title: TILTE,
};

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(true);
  const closeModal = useCallback(() => setIsModalOpened(false), []);

  return { isModalOpened, closeModal };
};

describe("<ModalWrapper />", () => {
  it("closeBtn 없음", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ModalWrapper
        closeModal={handleClick}
        hideCloseBtn
        {...modalWrapperProps}
      />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(TILTE)).toBeInTheDocument();
    expect(screen.queryByText(CHILDREN)).toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("closeBtn 있음", () => {
    const { result } = renderHook(() => useModal());

    const { container } = render(
      <ModalWrapper
        closeModal={() =>
          act(() => {
            result.current.closeModal();
          })
        }
        {...modalWrapperProps}
      />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByText("children")).toBeInTheDocument();

    expect(screen.queryByRole("button")).toBeInTheDocument();

    // 클릭시 isModalOpened -> false
    fireEvent.click(
      screen.queryByRole("button") || screen.queryByRole("submit")
    );
    expect(result.current.isModalOpened).toBe(false);
  });
});
