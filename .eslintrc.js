module.exports = {
  root: true,
  parser: 'vue-eslint-parser', //ESLint自定义解析器.vue文件
  parserOptions: {
    parser: 'babel-eslint', //解析器，这里我们使用babel-eslint
    ecmaVersion: 6, // ECMAScript版本
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended'
  ],
  plugins: ['prettier', 'vue'],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    /**
     * off 或 0：表示不验证规则。
     * warn 或 1：表示验证规则，当不满足时，给警告
     * error 或 2 ：表示验证规则，不满足时报错
     */
    // 关闭冲突规则
    'prettier/prettier': [
      'off',
      {
        printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为80
        tabWidth: 2, // 一个tab代表几个空格数，默认为80
        useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
        singleQuote: true, //使用单引号而不是双引号。
        semi: true, // 行尾是否使用分号，默认为true
        trailingComma: 'none', //多行时尽可能打印句号。
        bracketSpacing: true, // 在对象文字中打印括号之间的空格。
        jsxBracketSameLine: true, // 放在最后一行末尾
        vueIndentScriptAndStyle: true, // 在vue文件允许缩进
      }
    ],
    //////////////
    // 相关Vue规则 //
    //////////////
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/html-self-closing': 0,
    'vue/attributes-order': 0,
    'vue/no-parsing-error': 0,
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: true
      }
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    //////////////
    // 相关ESlint //
    //////////////
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'accessor-pairs': 2,
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    curly: [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'],
    indent: 0,
    'jsx-quotes': 0,
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 0,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 0,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': 0,
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: 0,
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': 0,
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': 0,
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 0,
    'object-curly-spacing': 0,
    'array-bracket-spacing': [2, 'never']
  }
};
