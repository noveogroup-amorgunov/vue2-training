// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      vue: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
  },
  extends: ['vue', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'always'
    }],
    "import/prefer-default-export": ["off"],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'props'] }],
    'max-len': ['error', { code: 140 }],
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-await-in-loop": ["off"],
  }
};