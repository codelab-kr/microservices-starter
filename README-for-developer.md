# NestJS + Yarn2

```bash
$ yarn global add @nestjs/cli
$ nest new api
$ cd api
```

# Yarn2

```bash
$ yarn set version berry
$ yarn set version stable

$ yarn -v
4.02

$ vi .yarnrc.yml
cacheFolder: ./.yarn/cache
enableGlobalCache: false
enableScripts: false
nodeLinker: pnp
pnpMode: strict

$ yarn add --dev typescript @types/node nodemon
```

<br>

# VS Code

```bash
# ZipFS extension 설치 후
# 타입/모듈 추론을 위한 yarn berry의 vscode 세팅
$ yarn dlx @yarnpkg/sdks vscode

# .ts 파일 열기 --> TypeScript: Select TypeScript Version 팝업 -> Allow
# 또는
# .ts 파일 열기 --> 맨위의 검색 창에서 > TypeScript: Select TypeScript Version 선택 --> sdk 버전(작업 영역) 선택
```

<br>

```bash
# .prettierrc
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
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "disableLanguages": []
}
```

```bash
$ vi .vscode/settings.json
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "eslint.nodePath": ".yarn/sdks",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,

  # add
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
}
```

# MonoRepo

```bash
nset generate app auth
nest generate app videos
nest generate app storage
nest generate app history

nest generate library common

# nest-cli.json 수정
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/api/src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": false, # 수정
    "tsConfigPath": "apps/api/tsconfig.app.json"
  },
  "monorepo": true,
  "root": "apps/api",
  "projects": {
    "api": {
      "type": "application",
      "root": "apps/api",
      "entryFile": "main",
      "sourceRoot": "apps/api/src",
      "compilerOptions": {
        "tsConfigPath": "apps/api/tsconfig.app.json"
      }
    },
    "auth": {
      "type": "application",
      "root": "apps/auth",
      "entryFile": "main",
      "sourceRoot": "apps/auth/src",
      "compilerOptions": {
        "tsConfigPath": "apps/auth/tsconfig.app.json"
      }
    }
    ...
  }
}


```

---

아래는 참고

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

<br>
