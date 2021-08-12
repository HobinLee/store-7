import { useState } from "react";

export type InputType = {
  value: string;
  onChange: ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    const { value } = target;
    setValue(value);
  };

  return { value, onChange, setValue };
};
