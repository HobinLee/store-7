import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  color: {
    title_active: "#1e2222",
    body: "#626666",
    label: "#8d9393",
    placeholder: "#c1c5c5",
    grey1: "#888888",
    grey2: "#bbbbbb",
    line: "#ccd3d3",
    background: "#f5f5f5",
    off_white: "#fcfcfc",
    primary1: "#2ac1bc",
    primary2: "#a0e1e0",
    primary3: "#219a95",
    red: "#f45452",
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  1440: customMediaQuery(1440),
  768: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
