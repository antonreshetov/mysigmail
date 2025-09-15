import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
  },
  ignores: ['**/generated/'],
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        destructureOnly: true,
        ignoreCase: true,
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
      },
    ],
  },
})
