import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { InputType } from "@/hooks/useInput";
import { ValidationType } from "@/hooks/useValidation";
import { gap } from "@/styles/theme";
import { useEffect } from "react";

type VIPropsType = {
  input: InputType;
  validation: ValidationType;
  placeholder?: string;
  message?: string;
  type?: string;
  onChange?: (e: ChangeEvent) => void;
  onInput?: ({ target }: { target: HTMLTextAreaElement }) => void;
  className?: string;
  maxLength?: number;
  filter?: (string) => string;
};

const ValidationInput = ({
  input,
  validation,
  message,
  placeholder,
  type = "text",
  onChange = null,
  onInput = null,
  filter = null,
  className,
  maxLength,
}: VIPropsType) => {
  const [isFirstType, setIsFirstType] = useState(true);
  const checkValidStyle = isFirstType || validation.isValid;

  useEffect(() => validation.onCheck(input.value), []);

  const handleBlurInput = () => {
    setIsFirstType(false);
    validation.onCheck(input.value);
  };

  return (
    <InputWrapper>
      {type === "textarea" ? (
        <textarea
          className={
            checkValidStyle
              ? `${className} valid-input `
              : `${className} invalid-input`
          }
          defaultValue={!!filter ? filter(input.value) : input.value}
          onChange={(e) => {
            onChange && onChange(e);
            input.onChange(e);
          }}
          onInput={(e) => {
            onInput && onInput({ target: e.target as HTMLTextAreaElement });
          }}
          onBlur={handleBlurInput}
          placeholder={placeholder}
          wrap="virtual"
          maxLength={maxLength}
        />
      ) : (
        <input
          className={
            checkValidStyle
              ? `${className} valid-input`
              : `${className} invalid-input`
          }
          defaultValue={filter ? filter(input.value) : input.value}
          onChange={(e) => {
            onChange && onChange(e);
            input.onChange(e);
            console.log(input.value);
          }}
          onBlur={handleBlurInput}
          placeholder={placeholder}
          type={type}
        />
      )}
      {!checkValidStyle && message && (
        <small className="input__err-message">{message}</small>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${gap("1rem", "column")}
  position: relative;

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 2rem;

    ::placeholder {
      color: ${({ theme }) => theme.color.grey2};
    }
  }
  .valid-input {
    color: ${({ theme }) => theme.color.body};
    border: 1px solid ${({ theme }) => theme.color.light_grey2};
  }

  .invalid-input {
    color: ${({ theme }) => theme.color.error_color};
    border: 2px solid ${({ theme }) => theme.color.error_color};

    &:focus {
      color: ${({ theme }) => theme.color.body};
      border: 2px solid ${({ theme }) => theme.color.error_color};
    }
  }

  .input__err-message {
    color: ${({ theme }) => theme.color.error_color};
    position: absolute;
    left: 0;
    bottom: -2rem;
  }
`;

export default ValidationInput;
