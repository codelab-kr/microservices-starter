# Yarn2

```bash
$ yarn set version berry

$ yarn -v
4.02

$ yarn init

$ echo nodeLinker: pnp > .yarnrc.yml
nodeLinker: pnp // Add this line!

$ vi package.json
{
  "name": "nodejs-design-patterns",
  "packageManager": "yarn@4.0.2",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist"
  }
}

$ yarn install

$ yarn add --dev typescript @types/node nodemon

```

<br>

# VS Code

```bash
# ZipFS extension 설치 후

$ yarn dlx @yarnpkg/sdks vscode

# Allow
# 또는
# .ts 파일 선택 후 > TypeScript: Select TypeScript Version --> sdk 버전(작업 영역)으로 선택

```

<br>

# Nodemon

```bash
$ vi nodemon.json
{
  "watch": [
      "src",
      ".env"
  ],
  "ext": "js,ts,json",
  "ignore": [
      "src/**/*.spec.ts"
  ],
  "exec": "ts-node  --transpile-only ./src/index.ts"
}

```

<br>

# TSConfig

```bash
{
  "compilerOptions": {
    "target": "es2017", // 컴파일 버전
    "allowSyntheticDefaultImports": true, // default export가 없는 모듈에서 default imports를 허용
    "experimentalDecorators": true, // decorator 실험적 허용
    "emitDecoratorMetadata": true, // 데코레이터가 있는 선언에 대해 특정 타입의 메타 데이터를 내보내는 실험적인 지원
    "skipLibCheck": true, // 정의 파일 타입 체크 여부
    "moduleResolution": "node", // commonJS -> node 에서 동작
    "module": "commonjs", // import 문법
    "strict": true, // 타입 검사 엄격하게
    "pretty": true, // error 메시지 예쁘게
    "outDir": "./dist", // 트랜스 파일 (.js) 저장 경로
    "allowJs": true, // js 파일 ts에서 import 허용
    "esModuleInterop": true, // ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 허용
    "baseUrl": "./", // 절대경로 설정
    "noImplicitAny": false, // any 허용
    "strictBindCallApply": false, // bind, call, apply 허용
    "forceConsistentCasingInFileNames": false, // 파일명 대소문자 구분
    "noFallthroughCasesInSwitch": false, // switch 문에서 break 허용
    "removeComments": true // 주석 제거
    // "strictNullChecks": false, // null 체크
    // "incremental": true, // 증분 컴파일
    // "sourceMap": true, // 소스맵 파일 생성 -> .ts가 .js 파일로 트랜스 시 .js.map 생성
    // "declaration": true, // .d.ts 파일 생성
  },
  "include": [
    "./src/**/*" // build 시 포함
  ],
  "exclude": ["node_modules", "dist", "**/*.(test|spec).ts"]
}
```

<br>

# ES Lint & Prettier

종속성 설치

```bash
# eslint
$ yarn add -D eslint
$ yarn dlx eslint --init
eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^6.4.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 || ^16.0.0  eslint-plugin-promise@^6.0.0 typescript@*
✔ Would you like to install them now? · No / Yes  # Select No

$  yarn add -D eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^6.4.0 eslint@^8.0.1
eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 || ^16.0.0  @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-promise

# prettier
$ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

  <br>

.vscode 반영

```bash
# extensions 설치
"dbaeumer.vscode-eslint",
"esbenp.prettier-vscode"

# eslint, prettier 반영
$ yarn dlx @yarnpkg/sdks vscode
$ vi .vscode/settings.json

{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "eslint.nodePath": ".yarn/sdks",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "eslint.validate": [
    "typescript",
    "javascript",
  ],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.prettier": true
  },
  "editor.formatOnSave": true,
  "prettier.prettierPath": ".yarn/sdks/prettier/index.cjs"
}

```

<br>

.eslintrc.js

```bash
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'promise',
    'prettier',
    'jest',
    'import',
    'n'
  ],
  extends: [
    'standard-with-typescript',
    'prettier',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}

```

<br>

.prettierrc

```bash
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "insertPragma": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "disableLanguages": []
}
```
