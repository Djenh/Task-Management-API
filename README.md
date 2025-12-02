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

Configure database manager, you're using. Please check this link for others DB manager
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

## 3. Database Seeding

We need to have default value for Role, Permission and actions in our database before assigning them to the User.

Let's create a seeder by following the Prisma offical documentation

[https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding)


## 4. Validation Pipe and DTO

DTO means Data Transfer Object. It's a simple class that describes the shape of our input data.

Pipes have two typical use cases:

- transformation: transform input data to the desired form (e.g., from string to integer)
- validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception?


Install `class-validator` package by running this command
```bash
npm i --save class-validator class-transformer
```
Create DTO files for every model by running **resource** command line

```bash
nest g resource users
nest g resource tasks
nest g resource roles
```

This single command `nest g resource` generates:

- A module to organize everything

- A controller with RESTful endpoints

- A service for business logic

- DTO for data validation

- Entity/Model definitions

- Test files for everything

Enable global validation by adding Pipe Validatio in our `main.ts`

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Delete all fields which are defined in the DTO
    transform: true //Transform type of all incoming data automatically
  }));
  await app.listen(process.env.PORT ?? 3000);
}
```


## 5. Module, controller and service

Create a Prisma Module and Service to initialize connection with the database.

In every module (eg. `user.module.ts` file), import *PrismaModule*

```typescript
imports: [PrismaModule],
...
```


In every controller (eg. `user.controller.ts` file), add constructor with its model Service injected in it.

```typescript
constructor(private readonly usersService: UsersService) {}

@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}

...
```

In `user.service.ts` file, add constructor with PrismaService injected in it.

```typescript
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

constructor(private readonly prismaService: PrismaService){}

async create(createUserDto: CreateUserDto): Promise<User> {
  ...
}
...
```


To launch the app, now run 
```bash
npm run start:dev
```

**Test the endpoints**

All endpoints will be in format **http://ip_address:3000/users**

With Postman or other API testing tool, test endpoints
- GET http://ip_address:3000/users
- GET http://ip_address:3000/users/1
- POST http://ip_address:3000/users

- GET http://ip_address:3000/tasks
- GET http://ip_address:3000/tasks/1
- POST http://ip_address:3000/tasks


## 6. Authentication with JWT



## 7. Authorization



## 8. Logging, Middleware and Exception Handling



## 9. Rate limits



## 10. Upload file



## 11. Pagination, Filtering, and Swagger



## 12. Testing 


## 13. Deployment 
