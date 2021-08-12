import React, { ReactElement, useState } from "react";
import styled from "styled-components";

type FormSectionType = {
  title: string;
  brief?: string;
  children: ReactElement | ReactElement[];
};

const InputSection = ({ title, brief, children }: FormSectionType) => {
  return (
    <SectionWrapper>
      <h3 className="form__title">{title}</h3>
      {brief && <small className="form__brief">{brief}</small>}
      {children}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .form__title {
    ${({ theme }) => theme.font.medium}
    font-weight: bolder;
  }

  .form__brief {
    ${({ theme }) => theme.font.small}
    color: ${({ theme }) => theme.color.grey1};
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.color.light_grey2};
    ${({ theme }) => theme.font.medium}
    ${({ theme }) => theme.borderRadius.small}

  &:disabled {
      background: ${({ theme }) => theme.color.background};
    }

    &:focus {
      background: none;
      border: 3px solid ${({ theme }) => theme.color.primary2};
    }

    ::placeholder {
      color: ${({ theme }) => theme.color.light_grey2};
    }
  }

  .form__error-msg {
    color: ${({ theme }) => theme.color.error_color};
  }
}

.invalid-section {
  color: ${({ theme }) => theme.color.error_color};

  input {
    border: 1px solid ${({ theme }) => theme.color.error_color};

    &:focus {
      background: none;
      border: 1px solid ${({ theme }) => theme.color.error_color};
    }
  }
`;

export default InputSection;
