const { defineConfig } = require('eslint/config')
const globals = require('globals')
const js = require('@eslint/js')
const nextPlugin = require('@next/eslint-plugin-next')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = defineConfig([
  {
    ignores: ['.next/', 'out/', 'node_modules/', '*.config.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        React: 'readonly',
        JSX: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'prettier/prettier': 'error',
      '@next/next/no-html-link-for-pages': 'off',
      'react/no-unescaped-entities': 'off',
    },
    settings: {
      react: {
        version: '18.3',
      },
      next: {
        rootDir: __dirname,
      },
    },
  },
])