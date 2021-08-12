import styled from "styled-components";
import { LINE_LINK } from "@/assets/";

export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 22rem;
  padding-bottom: 30rem;
`;

export const Contents = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  margin: auto;
  max-width: 120rem;
  width: 100%;
  padding: 0 5rem;
  box-sizing: border-box;
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
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
  & > * {
    flex: 1;
  }
`;
