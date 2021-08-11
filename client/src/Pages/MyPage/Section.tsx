import React from "react";
import styled from "styled-components";
import { SignatureLine } from "@/shared/styled";

type SectionType = {
  title: string;
  descrition?: string;
  lineType: string;
  children: JSX.Element | JSX.Element[];
};

const Section = ({
  title,
  descrition = "",
  children,
  lineType,
}: SectionType) => {
  return (
    <SectionWrapper>
      <SignatureLine type={lineType} />
      <div className="title">
        <h3>{title}</h3>
        <p>{descrition}</p>
      </div>
      <div>{children}</div>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  margin-bottom: 12rem;

  .title {
    display: flex;
    align-items: flex-end;
    margin-bottom: 3rem;

    h3 {
      ${({ theme }) => theme.font.large}
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
