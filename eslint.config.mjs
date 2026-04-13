// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';

export default withNuxt({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': ['error', {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    }],
    'no-shadow': 'off',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/eol-last': 'error',
    '@stylistic/quotes': [
      2,
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],

    '@stylistic/indent': [
      'error',
      2,
      {
        offsetTernaryExpressions: true,
        SwitchCase: 1,
      },
    ],

    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/arrow-parens': ['error', 'always'],

    '@stylistic/lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    '@stylistic/array-element-newline': ['error', 'consistent'],
    '@stylistic/array-bracket-newline': ['error', 'consistent'],

    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'expression',
        next: 'const',
      },
      {
        blankLine: 'always',
        prev: 'const',
        next: 'expression',
      },
      {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-const',
      },
    ],
    '@stylistic/type-annotation-spacing': 'error',
    '@stylistic/type-generic-spacing': ['error'],
    '@stylistic/type-named-tuple-spacing': ['error'],
    '@stylistic/space-infix-ops': ['error'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/block-tag-newline': 'error',
    'vue/no-v-html': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-indent': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-end-tags': 'error',
    'vue/html-quotes': 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-template-shadow': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/require-prop-types': 'error',
    'vue/singleline-html-element-content-newline': 'off',
  },
});
