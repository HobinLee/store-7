import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { media } from './theme';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    @mixin flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
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
