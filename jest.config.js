module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testTimeout: 60000,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFiles: ['./src/setupTests.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
