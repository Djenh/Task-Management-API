<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Step by step guide to build a full NestJS Task Management API app with authentication, middlewares, roles and permissions, controllers and services.</p>


## 1. Project setup
Create the project folder by running the following command

```bash
nest new tuto-task-app
```

Then choose `npm` or `yarn` or `pnpm` as your packages manager to craft the app. 
After creating the project go to it directory and open the project folder with your code editor.

```bash
cd new tuto-task-app
```

```bash
npm install
```

Check if the project is well set up
```bash
npm run start:dev
```
And go to [http://localhost:3000/](http://localhost:3000/)
If everything runs well, you'll see a **`Hello World`** messsage



## 2. Connecting to the database using Prisma

### 2.1. Install Prisma

Prisma is an open-source ORM for Node.js and TypeScript
```bash
npm install prisma --save-dev
```
To hash password in database
```bash
npm install bcrypt @types/bcrypt
```
Now, install `dotenv` package

```bash
npm install dotenv
```

Now create your initial Prisma setup using the init command of the Prisma CLI:

```bash
npx prisma init
```
This command creates a new prisma directory with `schema.prisma` and `.env` files
In the file `schema.prisma` ensure that you have the following lines
```typescript
generator client {
  provider = "prisma-client-js"
  //output   = "../generated/prisma" // <---- Delete this line
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
But it will depends of the database manager, you're using. Please check this link for others DB manager
[https://docs.nestjs.com/recipes/prisma#set-up-prisma](https://docs.nestjs.com/recipes/prisma#set-up-prisma)


In the file `prisma.config.ts` add the import package dotenv
```typescript
import "dotenv/config";
```

Check your `.env` file to ensure that the **DATABASE_URL** is correct.


### 2.2. Create migrations in Prisma

In the file `schema.prisma` create your models

After model is written, run command to format in Prisma tabulation
```bash
npx prisma format
```

Now run 
```bash
npx prisma migrate dev --name init
```

This command will create migrations in your database and it will automatically install Prisma Client
for your project if it not yet set up.
In case prisma clien is not installed with that command, please run the following one

```bash
npm install @prisma/client
```

As we run the command with `dev` option, you can now see a migration file created by Prisma in the
directory `prisma\migrations\2025...\migration.sql`


Everytime you modify your models, you need to run these commands
```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name edit_service_model
```

