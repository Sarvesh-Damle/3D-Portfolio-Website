module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    'react/no-unknown-property': ['error', { ignore: ['intensity', 'position', 'args', 'object', 'rotation', 'castShadow', 'receiveShadow', 'polygonOffset', 'polygonOffsetFactor', 'flatShading', 'groundColor', 'angle', 'penumbra', 'shadow-mapSize', 'position-y', 'rotation-y'] }], // Three.js props
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
    'jsx-a11y/click-events-have-key-events': 'warn', // Downgrade to warning
    'jsx-a11y/no-noninteractive-element-interactions': 'warn', // Downgrade to warning
    'jsx-a11y/no-static-element-interactions': 'warn', // Downgrade to warning
  },
}
