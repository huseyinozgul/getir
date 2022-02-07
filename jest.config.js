module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'src/models', 'src/utils', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
