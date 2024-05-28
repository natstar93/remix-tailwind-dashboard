/** @type {import('ts-jest').JestConfigWithTsJest} */
const esModules = ['@web3'].join('|');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>./jest-setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '~/(.*)': '<rootDir>./app/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': ['ts-jest'],
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
