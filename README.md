# Nest Sample

## Description
This app demonstrate combination of the folowing technologies:
* Type-script.
* Nest-js.
* Type-orm.
* Graph-ql.

## Creating app base line
1. Run this command within the project parent folder:
    ```bash
    $ nest new <your-project-name>
    ```
2. At file 'tsconfig.json' file, at 'compilerOptions' object, set `"strictNullChecks": true`.
3. Run this command within the project root folder:
    ```bash
    $ npm init @eslint/config
    ```
4. At file '.eslintrc.json', at 'env' object, replace `"browser": true` with `"node": true`.
5. At file '.eslintrc.json', at 'parserOptions' object, add entry `"project": ["tsconfig.json"]`.
6. Run this command within the project root folder:
    ```bash
    $ npm run lint
    ```
7. Fix syntax errors accurding result of the linter.


## Installation
Run this command within the project root folder:
```bash
$ npm install
```

## Build the app
Run this command within the project root folder:
```bash
$ npm run build
```

## Running the app
Run those commands within the project root folder:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using the app
Open browser, and navigate to the folowing URLs:
* Main page: http://localhost:3000
* Graphql playground: http://localhost:3000/graphql

## Test
Run those commands within the project root folder:
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Adding new resource
Run this command within the project root folder:
```bash
$ npx nest g resource
```
The CLI will prompt you with a few questions, in order to create the desiared Entity, DTOs, Module, Resolver, Service, and Tests.

## Nest docs, code and samples
* [docs](https://docs.nestjs.com).
* [code and samples](https://github.com/nestjs/nest).
