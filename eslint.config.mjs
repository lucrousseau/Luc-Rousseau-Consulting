import { FlatCompat } from "@eslint/eslintrc";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "bk/**"],
  },
  ...coreWebVitals,
  ...compat.extends("plugin:prettier/recommended", "plugin:security/recommended-legacy"),
  {
    files: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "security/detect-object-injection": "off",
      "security/detect-non-literal-fs-filename": "off",
    },
  },
];

export default eslintConfig;
