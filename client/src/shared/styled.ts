import styled from "styled-components";
import { LINE_LINK } from "@/assets";
import { gap, media } from "@/styles/theme";

export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 20rem;
  padding-bottom: 30rem;
  min-height: 100vh;
  box-sizing: border-box;
  ${media.mobile} {
    padding-top: 12rem;
    max-width: 100vw;
  }
`;

export const Contents = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  margin: auto;
  max-width: 120rem;
  width: 100%;
  padding: 0 5rem;
  box-sizing: border-box;

  ${media.mobile} {
    padding: 0 1rem;
  }
`;

export const DropdownWrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.shadow}
  background-color: ${({ theme }) => theme.color.background};
  position: absolute;
  flex-direction: column;
`;

export const DropdownItem = styled.div`
  width: 11rem;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  &:hover {
    background: lightgray;
  }
`;

export const SignatureLine = styled.div<{ type: string }>`
  width: 100%;
  height: 3rem;
  background: url(${({ type }) => LINE_LINK[type]}) no-repeat;
  background-size: contain;
`;

export const ItemList = styled.ul`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  width: 100%;

  & > * {
    flex: 1;
  }

  ${gap("1rem")}
`;

export const ProductWrapList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li {
    padding: 1rem;
    box-sizing: border-box;
    flex: 0 0 25%;
  }
  ${media.mobile} {
    li {
      padding: 0.5rem;
      flex: 0 0 50%;
    }
  }
`;
