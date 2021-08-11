import { createGlobalStyle, css } from "styled-components";
import { reset } from "styled-reset";
import { media } from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    html{
        font-size: 10px;
        font-family: Noto Sans KR, Apple SD Gothic Neo, sans-serif;
        font-display: fallback;
        overflow-x: hidden;
        color: ${({ theme }) => theme.color.title_active};
        a{
            text-decoration: none;
            color: ${({ theme }) => theme.color.title_active};
        }
        input,
        button,
        textarea {
            background: none;
            border: none;
            &:focus {
                outline: none;
            }
        }
        textarea {
            border: none;
            resize: none;
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
