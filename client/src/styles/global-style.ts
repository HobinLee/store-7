import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { media } from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 10px;
    font-family: Noto Sans KR, Apple SD Gothic Neo, sans-serif;
    font-display: fallback;
    overflow-x: hidden;
    color: ${({ theme }) => theme.color.title_active};
    a {
      text-decoration: none;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      color: inherit;
      font: inherit;
      margin: 0;
      background: none;
      border: none;
    }

    input,
    button,
    select,
    textarea {
      &:focus {
        outline: none;
      }
    }

    textarea {
      border: none;
      resize: none;
    }
    input[type="file"] {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    input[type="checkbox"]{
        all: unset;
    }
  }

  .no-scroll-bar::-webkit-scrollbar {
    display: none;
  }
  .no-scroll-bar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .mobile__only {
    display: none;
    ${media.mobile} {
      display: block;
    }
  }
  .mobile__none {
    ${media.mobile} {
      display: none;
    }
  }

  @font-face {
    font-family: 'BMEULJIRO';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'BMKIRANGHAERANG';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMKIRANGHAERANG.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'BMDOHYEON';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;
