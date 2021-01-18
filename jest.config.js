module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/test/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/rules.ts',
    '!<rootDir>/src/**/pages/*.ts',
    '!<rootDir>/src/**/(main|config).ts',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/cypress'],
  testTimeout: 60000,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
