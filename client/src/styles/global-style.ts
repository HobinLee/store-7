import { createGlobalStyle, css } from 'styled-components';
import { reset } from 'styled-reset';
import { media } from './theme';

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

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const shadow = css`
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.1),
    0 0.4rem 2rem rgba(0, 0, 0, 0.1);
`;
