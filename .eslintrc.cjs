module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.next', '.eslintrc.cjs', '**/*.html', '**/*.*js'],
  root: true,
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-no-target-blank': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react/display-name': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
  },
  overrides: [
    {
      files: ['src/app/*/layout.tsx', 'src/app/*/page.tsx'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
};
