module.exports = function(wallaby) {
  return {
    files: [
      "test-setup.ts",
      "jest.config.js",
      "tsconfig.json",
      "apps/**/*.+(ts|css|html)",
      "libs/**/*.+(ts|css|html)",
      "!**/*.spec.ts",
      "!**/node_modules/**/*",
      "!**/dist/**/*"
    ],

    tests: ["**/test/**/*.spec.ts", "!**/node_modules/**/*", "!**/dist/**/*"],

    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        module: "commonjs",
        getCustomTransformers: () => {
          return {
            before: [
              require("jest-preset-angular/InlineHtmlStripStylesTransformer").factory({ compilerModule: require("typescript") })
            ]
          }
        }
      }),
      "**/*.html": file => ({
        code: require("ts-jest").process(file.content, file.path, {
          globals: { "ts-jest": { stringifyContentPathRegex: "\\.html$" } }
        }),
        map: { version: 3, sources: [], names: [], mappings: [] },
        ranges: []
      })
    },

    setup: function(wallaby) {
      const { pathsToModuleNameMapper } = require('ts-jest')
      const { compilerOptions } = require('./tsconfig')
      const jestConfig = require("./jest.config")
      jestConfig.setupFilesAfterEnv = ["./test-setup.ts"]
      jestConfig.moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths)
      wallaby.testFramework.configure(jestConfig)
    },

    preprocessors: {
      "**/*.js?(x)": file =>
        require("@babel/core").transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path,
          presets: [require("babel-preset-jest")]
        })
    },

    hints: {
      allowIgnoringCoverageInTests: true,
      ignoreCoverage: /ignore coverage/
    },

    env: {
      type: "node",
      runner: "node"
    },

    testFramework: "jest",

    debug: true
  }
}
