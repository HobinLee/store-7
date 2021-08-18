import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { light } from "@/styles/theme";
import { RecoilRoot } from "recoil";

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={light}>
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
