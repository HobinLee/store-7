import { useState } from "react";

export type ValidationType = {
  isValid: boolean;
  onCheck: (input: string) => void;
  setIsValid: (boolean) => void;
};

export default (
  checkValidation: (input: string) => boolean,
  defaultValue: boolean = null
): ValidationType => {
  const [isValid, setIsValid] = useState<boolean>(defaultValue);

  const onCheck = (input: string) => {
    setIsValid(checkValidation(input));
  };

  return { isValid, onCheck, setIsValid };
};
