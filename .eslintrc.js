function getJestGlobals (flag = true) {
  return {
    afterAll: flag,
    afterEach: flag,
    beforeAll: flag,
    beforeEach: flag,
    describe: flag,
    expect: flag,
    fit: flag,
    it: flag,
    jest: flag,
    test: flag,
    xdescribe: flag,
    xit: flag,
    xtest: flag
  }
}

module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {

  },
  globals: {
    // 为什么不起作用
    // 'jest/globals': true,
    ...getJestGlobals()
  }
}
