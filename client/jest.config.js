module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif)$":
      "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setUpTests.ts"],
};
