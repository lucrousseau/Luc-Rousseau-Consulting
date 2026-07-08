const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** ESM packages pulled in by html-react-parser v6. */
const esmDependencies =
  "html-react-parser|html-dom-parser|domhandler|domelementtype|domutils|entities|react-property|style-to-js|inline-style-parser";

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },
};

module.exports = async () => {
  const jestConfig = await createJestConfig(config)();

  return {
    ...jestConfig,
    transformIgnorePatterns: [
      ...(jestConfig.transformIgnorePatterns ?? []).filter(
        (pattern) => !String(pattern).includes("node_modules")
      ),
      `/node_modules/(?!(${esmDependencies})/)`,
    ],
  };
};
