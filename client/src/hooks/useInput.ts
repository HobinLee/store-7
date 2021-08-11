import { useState } from "react";

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
