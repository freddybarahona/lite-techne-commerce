//restricciones de imports para capas especificas de
//los microservicios

const importPlugin = require("eslint-plugin-import");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**"]
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    }
    ,
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".json"]
        }
      }
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-restricted-paths": ["error", {
        zones: [
          {
            target: "./src/domain",
            from: "./src/infrastructure",
            message: "El dominio NO puede importar infrastructure."
          },
          {
            target: "./src/domain",
            from: "./src/features",
            message: "El dominio NO puede importar features."
          },
          {
            target: "./src/features",
            from: "./src/infrastructure",
            message: "Features NO puede importar infrastructure directamente."
          },
          {
            target: "./src/infrastructure",
            from: "./src/features",
            message: "Infrastructure NO puede importar features (circular)."
          }
        ]
      }]
    }
  }
];