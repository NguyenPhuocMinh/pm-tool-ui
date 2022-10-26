module.exports = {
  displayName: {
    name: 'pm-tool-ui-test',
    color: 'blue'
  },
  verbose: true,
  clearMocks: true,
  errorOnDeprecated: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  moduleDirectories: ['node_modules', 'bower_components'],
  transformIgnorePatterns: [
    '<rootDir>/bower_components/',
    '<rootDir>/build/',
    '<rootDir>/node_modules/'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  setupFiles: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  projects: [
    {
      displayName: 'tests',
      testMatch: ['<rootDir>/src/test/**/*.js']
    },
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testPathIgnorePatterns: ['/node_modules/'],
      testMatch: ['<rootDir>/src/test/*.js', '<rootDir>/src/test/**/*.js']
    }
  ]
};
