module.exports = {
  extends: ['airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['data/server.js', '**/*.test.ts', '**/*.test.tsx'] },
    ],
    'react/jsx-wrap-multilines': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
