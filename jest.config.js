/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  reporters: ['default', 'jest-allure'],
  testRunner: 'jest-jasmine2',
};