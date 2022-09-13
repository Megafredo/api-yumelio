# API Yumelio

## Introduction

API Yumelio is an API for creating a portfolio.

- Technologies used for it are :

```
NodeJS Express Framework
TypeScript
Json Web Token & Session
Bcrypt for passwords
Dotenv to configure environment variables
Ajv to create schema
Helmet for API security
```

- For database :

```
PostgreSQL (DBSM)
pgAdmin4 (GUI)
```

- For versioning :

```
  Git & GitHub/ GitLab
  Sqitch for database versioning
```

- For testing :

```
  Jest
  Supertest
```

- For documentation :

```
Swagger UI with swagger-express
```

## How to launch the application ?

First, clone the repository

```sh
git clone <ssh link>
```
Then, install the packages needed for the application

```sh
npm install
# or npm i
```
Add `.env` file and configure your database :

```sh
#INFO CONNEXION DB FOR PSQL new Client()
PGHOST=localhost
PGDATABASE=#
PGUSER=#
PGPASSWORD=#
PGPORT=5432
```
And add all the **environment variables** needed for the application :

```sh
#SESSION
SESSION_SECRET=#

#JWT
#Generate random token : 
#launch node and copy 
#require("crypto").randomBytes(64).toString("hex")
ACCESS_TOKEN_SECRET=#
REFRESH_TOKEN_SECRET=#

# DEBUG
DEBUG=EntryPoint,Pool,ErrorHandling,Controller,Jwt,Schema

#MAILER
USER_MAILER=
PASSWORD_MAILER=

```


And then, you can run the application with the following command 

```sh
npm run dev
```
And if you want to see the documentation, launch the app and add at the end of url `/api-docs`

```sh
http://localhost:<PORT>/api-docs
```
___

## Summary

- [Start](./__docs__/00_start.md)
- [Folder Structure](./__docs__/01_folder.md)
- [Project](./__docs__/02_project.md)
- [Use case](./__docs__/03_usecase.md)
- [CDM - LDM - PDM](./__docs__/04_mcd-mld-mpd.md)
- [Endpoints](./__docs__/05_endpoints.md)
- [Entrypoint](./__docs__/06_entrypoint.md)
- [Structure : how it works](./__docs__/07_structure.md)
- [Database](./__docs__/08_database.md)
- [Typescript](./__docs__/09_typescript.md)
- [Authentication : JsonWebToken](./__docs__/10_jsonwebtoken.md)
- [Check the body with AJV](./__docs__/11_ajv.md)
- [Nodemailer](./__docs__/12_nodemailer.md)
- [Handle and log the errors](./__docs__/13_errors.md)


---

## Sources

Data Models :

- [Conceptual and Logical Data Model](https://opentextbc.ca/dbdesign01/chapter/chapter-4-types-of-database-models/)
- [Physical Data Model](https://www.ibm.com/docs/en/ida/9.1.1?topic=modeling-physical-data-models)

Security :

- [Helmet](https://helmetjs.github.io/)
- [Cookie&session - Samesite](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)
- [Session configuration Express](https://expressjs.com/en/resources/middleware/session.html)

Express & Typescript :

- [Request](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-session/index.d.ts)
- [Types and express-session](https://akoskm.com/how-to-use-express-session-with-custom-sessiondata-typescript)
- [Middlewares](https://www.spiceworks.com/tech/cloud/articles/what-is-middleware/)
- [Data Mapper](https://designpatternsphp.readthedocs.io/en/latest/Structural/DataMapper/README.html)


Nodemailer :

- [Nodemailer](https://nodemailer.com/) 
- [Solution after May 30 with GoogleMail](https://stackoverflow.com/questions/71477637/nodemailer-and-gmail-after-may-30-2022)

PostgreSQL : 

- [Upsert data](https://www.prisma.io/dataguide/postgresql/inserting-and-modifying-data/insert-on-conflict)
- [Update or Insert](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-upsert/)

Convert SVG : 

- [Btoa convert SVG into base64 explained](https://www.w3schools.com/jsref/met_win_btoa.asp)
- [Convert SVG](https://thewebdev.info/2021/08/28/how-to-convert-inline-svg-to-base64-string-with-javascript/)
- [File to SVG](https://developer.mozilla.org/fr/docs/Web/API/FileReader/readAsDataURL)