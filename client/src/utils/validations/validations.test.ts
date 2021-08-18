import { validateEmail, validatePW, validatePhoneNumber } from "./index";

describe("Test Email", () => {
  it("should be false", () => {
    const invalidEmails: string[] = [
      "viny5120",
      "viny5120.com",
      "viny5120@com",
      "viny5120@a.a",
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBeFalsy();
    });
  });

  it("should be true", () => {
    const validEmails: string[] = [
      "viny5120@gmail.com",
      "viny.5120@gmail.co.kr",
      "viny5120@a.go.kr",
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBeTruthy();
    });
  });
});

describe("Test Password", () => {
  it("should be false", () => {
    const invalidPassword: string[] = [
      "121",
      "010284120412",
      "asdv",
      "asdkljVSKLAqio",
      "!@$#&#$%*!@$!@#",
      "asd1!@!",
    ];

    invalidPassword.forEach((pw) => {
      expect(validatePW(pw)).toBeFalsy();
    });
  });

  it("should be true", () => {
    const invalidPassword: string[] = [
      "12asdkl23j", //숫자 문자 조합
      "111112111!", //숫자 특수문자 조합
      "!asdflkjas", //특수문자 문자 조합
    ];

    invalidPassword.forEach((pw) => {
      expect(validatePW(pw)).toBeTruthy();
    });
  });
});
