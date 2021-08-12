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
      color: ${({ theme }) => theme.color.title_active};
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
​
    .checkbox-container {
        position: relative;
        display: flex;
        align-items: center;
        height: 25px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    ​
    .checkbox-container > label {
        margin-left: 35px;
        font-size: 15px;
    }
    ​
    .checkbox-container .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: var(--light-gray-color);
    }
    ​
    .checkbox-container input:checked ~ .checkmark {
        background-color: var(--concept-color);
    }
    ​
    .checkbox-container .checkmark:after {
        content: "";
        display: block;
        position: absolute;
        left: 9px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: 1px solid #fff;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    } 
    ​
    .checkbox-container > img {
        position:absolute;
        right:0;
        transform:rotate(180deg);
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
`;
