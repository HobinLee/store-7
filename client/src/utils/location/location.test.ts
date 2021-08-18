import { decodeParams, encodeParams } from "./index";

describe("Test encode parameter function", () => {
  it("should be empty string", () => {
    const emptyParam = {};

    expect(encodeParams(emptyParam)).toBe("");
  });
  it("should be same string (positive number)", () => {
    const param = {
      p1: 1,
    };
    const expected = `p1=${param.p1}`;

    expect(encodeParams(param)).toBe(expected);
  });
  it("should be same string (negative number)", () => {
    const param = {
      p1: -1,
    };
    const expected = `p1=${param.p1}`;

    expect(encodeParams(param)).toBe(expected);
  });
  it("should be (encode need string)", () => {
    const param = {
      p1: "test test.test",
    };
    const expected = `p1=test%20test.test`;

    expect(encodeParams(param)).toBe(expected);
  });
  it("should be encoded (specialcharacter)", () => {
    const param = {
      p1: ".%/",
    };
    const expected = `p1=.%25%2F`;

    expect(encodeParams(param)).toBe(expected);
  });
  it("should be encoded (multiple)", () => {
    const param = {
      p1: 123,
      p2: "test",
      p3: "x910!g0-G92",
    };
    const expected = `p1=123&p2=test&p3=x910!g0-G92`;

    expect(encodeParams(param)).toBe(expected);
  });
});

describe("Test decode parameter function", () => {
  it("should be encoded (multiple)", () => {
    const encoded = `?p1=123&p2=test&p3=x910!g0-G92`;
    const expected = JSON.stringify({
      p1: "123",
      p2: "test",
      p3: "x910!g0-G92",
    });
    const decode = JSON.stringify(decodeParams(encoded));

    expect(decode).toBe(expected);
  });

  it("should be same form", () => {
    const origin = {
      p1: "123",
    };

    expect(JSON.stringify(decodeParams("?" + encodeParams(origin)))).toBe(
      JSON.stringify(origin)
    );
  });
});
