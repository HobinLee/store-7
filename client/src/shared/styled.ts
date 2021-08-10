import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  margin-top: 15rem;
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
