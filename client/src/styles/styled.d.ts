import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      title_active: string;
      body: string;
      label: string;
      placeholder: string;
      grey1: string;
      grey2: string;
      line: string;
      background: string;
      off_white: string;
      primary1: string;
      primary2: string;
      primary3: string;
      red: string;
    };
  }
}
