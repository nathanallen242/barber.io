// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo", 
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: [
    'import',
  ],
  ignorePatterns: ["/dist/*", "app/*", "components/*"],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
