import React from "react";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";

import App from "./App";

describe("<App />", () => {
  it("should render component in document", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
