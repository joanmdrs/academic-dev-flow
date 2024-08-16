module.exports = {
    setupFiles: ['C:/workspace/academic-dev-flow/frontend/academic_dev_flow/src/setupTests.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      "/node_modules/(?!axios)"
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    // Adicione esta configuração
    extensionsToTreatAsEsm: ['.ts', '.tsx']
  };
  