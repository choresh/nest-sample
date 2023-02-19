# Nest Sample

## Description
This app demonstrate combination of the folowing technologies:
* Type script.
* Nestjs.
* Graphql.
* Mongodb.

## How to scaffold a new project
1. Run this command within the project parent folder:
    ```bash
    $ nest new <your-project-name>
    ```
2. At file 'tsconfig.json', at 'compilerOptions' object, set `"strictNullChecks": true`.
3. At project root folder, add file '.eslintrc.json', with this content:
    ```
    {
        "env": {
            "node": true,
            "es2021": true
        },
        "extends": "standard-with-typescript",
        "overrides": [
        ],
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module",
            "project": ["tsconfig.json"]
        },
        "rules": {
        }
    }
    ```
4. In your VC Code IDE - install the [ESLint extention](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
5. Fix syntax errors accurding result of the linter.
6. Another way to invoke the linter - run this command within the project root folder:
    ```bash
    $ npm run lint
    ```
3. At project root folder, add file '.gitignore', with this content:
    ```
    # Dependency directory
    node_modules

    # Ignore built ts files
    dist/**/*

    # Coverage reports
    coverage
    ```

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
* Main page: http://localhost:3000.
* Graphql playground: http://localhost:3000/graphql.

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

Add this line within `@Module({})` of the reource:
```
imports: [TypeOrmModule.forFeature([<type of the resource entity class>])],
```

## Nest docs, code and samples
* [docs](https://docs.nestjs.com).
* [code and samples](https://github.com/nestjs/nest).
