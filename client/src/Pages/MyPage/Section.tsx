import React from "react";
import styled from "styled-components";

type SectionType = {
  title: string;
  descrition?: string;
  children: JSX.Element | JSX.Element[];
};

const Section = ({ title, descrition = "", children }: SectionType) => {
  return (
    <SectionWrapper>
      <div className="section__title">
        <h3>{title}</h3>
        <p>{descrition}</p>
      </div>
      <div>{children}</div>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  margin-top: 8rem;

  .section__title {
    display: flex;
    align-items: flex-end;
    margin: 1rem 0;
    h3 {
      ${({ theme }) => theme.font.medium}
      font-weight: bold;
    }
    p {
      ${({ theme }) => theme.font.small};
      color: ${({ theme }) => theme.color.grey1};
      margin-left: 1rem;
    }
  }
`;

export default Section;
