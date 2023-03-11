# Nest Sample

## Description
This app demonstrate combination of the folowing technologies:
* Type script.
* Nestjs.
* Graphql.
* Mongodb.

## Prerequisites (for this project)
* [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/).
* [Compass](https://www.mongodb.com/products/compass).
* In your VC Code IDE - install the [ESLint extention](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (recommended)

## Installation
Run this command within the project root folder:
``` bash
$ npm install
```

## Fix your local MongoDb installation (Convert a Standalone to a Replica Set)
* Run those commands to kill the MongoDB process:
  ```
  % pgrep mongo
  % kill <MongoDb Process ID>
  ```
* Run this command within the project root folder, to start MongoDb with the required configuration (do it in dedicated terminal, any close of the terminal will delete the DB data):
  ```
  run-rs npm module
  ```
* More info see [Convert a Standalone to a Replica Set](https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set).

## Build the app
Run this command within the project root folder:
``` bash
$ npm run build
```

## Running the app
Run those commands within the project root folder:
``` bash
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

## Nest docs, code and samples
* [Docs](https://docs.nestjs.com).
* [Code and samples](https://github.com/nestjs/nest).

## How to scaffold a new project
1. Run this command within the project parent folder:
    ``` bash
    $ nest new <your-project-name>
    ```
2. At file 'tsconfig.json', at 'compilerOptions' object, set `"strictNullChecks": true`.
3. At project root folder, add file '.eslintrc.json', with this content:
    ``` json
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

4. Fix syntax errors accurding result of the linter.
5. Another way to invoke the linter - run this command within the project root folder:
    ``` bash
    $ npm run lint
    ```
6. At project root folder, add file '.gitignore', with this content:
    ``` bash
    # Dependency directory
    node_modules

    # Ignore built ts files
    dist/**/*

    # Coverage reports
    coverage
    ```

## How to scaffold a new resource
Run this command within the project root folder:
``` bash
$ npx nest g resource
```
The CLI will prompt you with a few questions, in order to create the desiared Entity, DTOs, Module, Resolver, Service, and Tests.

Add this line within `@Module({})` of the reource:
``` bash
imports: [TypegooseModule.forFeature([<type of the resource entity class>])],
```

## Manage MongoDb migrations
Run command in this structure within the project root folder:
```
$ npm run migrate [command] [options]
```
Usage:
``` bash
$ npm run migrate [[create|up|down<migration-name>]|list|prune] [optional options]
```
Commands:
```
  list                     Lists all migrations and their current state.
  create <migration-name>  Creates a new migration file.
  up [migration-name]      Migrates all the migration files that have not yet
                           been run in chronological order. Not including
                           [migration-name] will run UP on all migrations that
                           are in a DOWN state.
  down <migration-name>    Rolls back all migrations down to given name (if down
                           function was provided)
  prune                    Allows you to delete extraneous migrations by
                           removing extraneous local migration files/database
                           migrations.
```

Options:
```
  --autosync              Automatically add any migrations on filesystem but not in db to db
                          rather than asking interactively (use in scripts)
  -h, --help              Show help
```

Morte details about migration infra see here: [migrate-mongoose](https://www.npmjs.com/package/migrate-mongoose?activeTab=readme).

Sample of (modified) migtration file:
``` javascript
const mongoose = require('mongoose')
const typegoose = require('@typegoose/typegoose')
const userEntity = require('./../dist/users/entities/user.entity')
const userModel = typegoose.getModelForClass(userEntity.User)

async function up () {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' })
  await userModel.updateMany({}, {
    $rename: { department: 'division' }
  }, {
    multi: true,
    strict: false // The 'strict: false' allows to update keys that currently not exist in the entity class.
  })
}

async function down () {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' })
  await userModel.updateMany({}, {
    $rename: { division: 'department' }
  }, {
    multi: true,
    strict: false // The 'strict: false' allows to update keys that currently not exist in the entity class.
  })
}

module.exports = { up, down }
 ``` 