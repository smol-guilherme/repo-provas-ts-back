/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
};
