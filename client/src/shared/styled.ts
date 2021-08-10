import { flexCenter, shadow } from "@/styles/global-style";
import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  margin-top: 15rem;
`;

export const DropdownWrapper = styled.div`
  ${flexCenter}
  ${shadow}
  background-color: ${({ theme }) => theme.color.background};
  position: absolute;
  flex-direction: column;
`;

export const DropdownItem = styled.div`
  width: 11rem;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  &:hover {
    background: lightgray;
  }
`;
