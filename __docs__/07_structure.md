# Structure 

Why structure ? 

We will clearly (at least try) show you how to use an URI to create a new project.

We will start from the `index.js` (the entrypoint, remember ?), see what happens when you want to create a project by using the POST http request and all you need to access this resource by going through middlewares and body control to use the create function and what it will return.00_start

So, the steps are : 

- Start from the `index.js`
- Use the POST http request
- Authentication and control what you send to the server by middlewares
- Use the create function written in the project controller
- Link with the database

___

## Start from the `index.js`

When you use an [URI](https://fr.wikipedia.org/wiki/Uniform_Resource_Identifier) (Uniform Resource Identifier), you send a request to the server that will send you back .

With Express, you use routes to create it.

Here, import the module in the index.js and use it :

```js
//~ Import module
import { router } from './app/routes/index.js';

//~ Router
app.use(router);
```

## Use the POST http request

In the index.js of routes folder : 

```js
//~ Import Router 
import { Router } from 'express';
const router = Router();

//~ Project
import {router as projectRouter} from './project.js';
router.use(projectRouter);

//~ Export router
export { router };
```
All the routes created for the project :

```js
//~ Import Router
import { Router } from 'express';
const router = Router();

import { createProject, fetchAllProjects,fetchOneProject, updateProject,deleteProject } from '../controllers/projectController.js';

import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';

import { projectSchema } from '../schema/project.schema.js';
import { validate } from '../middlewares/validateSchema.js';


//~ Home
router.post('/api/v1/projects', validate(projectSchema), [validateToken, auth, admin], createProject);

router.get('/api/v1/users/:userId(\\d+)/projects', fetchAllProjects);
router.get('/api/v1/users/:userId(\\d+)/projects/:projectId(\\d+)', fetchOneProject);

router.patch('/api/v1/projects/:projectId(\\d+)', validate(projectSchema), [validateToken, auth, admin], updateProject);
router.delete('/api/v1/projects/:projectId(\\d+)', [validateToken, auth, admin], deleteProject);


//~ Export router
export { router };
```

For the example, we will use this route :

```js
router.post('/api/v1/projects', validate(projectSchema), [validateToken, auth, admin], createProject);
```
You'll find here : 
- the url to identitfy resource 
- something called `validate(projectSchema)` : before sending data to the database, we need to control values sent
- `validateToken` valids the token from the header
- `auth` and `admin` to confirm that the user is registered and that the user is the admin
- `createProject` is the functionnality in the controller to create a project

## Authentication and control what you send to the server by middlewares

- ### Validate schema

For the app security, we need to control what kind of information will be sent to the server.

All of our test was made using restClient( a VSCode extension ) : create a file `.http` and write the request you want to send to the server

```sh
@entryPoint = http://localhost:4100/api/v1

@accessToken = Authorization: Bearer <Access Token> 

@refreshToken = Authorization: Bearer <Refresh Token>

#^ ------------------------ createProject
###
POST {{entryPoint}}/projects
Content-Type: application/json
{{accessToken}}

{
    "title": "Super projet !",
    "abstract": "Description de mon projet",
    "content": "Ceci est mon projet",
    "picture": "http://www.myPicture.com",
    "is_active": true,
    "date": "10 Mars 2022",
    "link": "http://www.myLink.com",
    "categories": [
        {"id":3},
        {"id":6},
        {"id":1}
    ]
}
```

The values we need to control are the following keys : 'title' needs to be a string, 'abstract' needs to be a string'..., 'is_active' needs to be a boolean etc... 

For that, we will create a schema which will be sent to AJV, the module we use to control the body 

```js
import { JSONSchemaType } from 'ajv';

// Define the type
interface ProjectSchema {
    title: string;
    abstract: string;
    content: string;
    picture: string;
    is_active?: boolean;
    date: string;
    link?: string;
    categories?: object[];
}

// Schema
const projectSchema: JSONSchemaType<ProjectSchema> = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        is_active: { type: 'boolean', nullable: true },
        date: { type: 'string' },
        link: { type: 'string', nullable: true },
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: { id:{type: 'number', nullable: true} },
            },
            nullable: true
        }
    },
    required: ['title', 'abstract', 'content', 'picture', 'date'],
    additionalProperties: false
};

export { projectSchema };

```
- ### Validate token

Everything in detail is written here : [JsonWebtoken](..10_jsonwebtoken.md)

- ### Registering and Authentication

Middlewares are a layers that enables interaction and transmission of information between assorted applications and services that make up a complex system, providing a uniform user experience for clients.

We want to control if a user is registered, if he is authenticated and, in this case, if the user is an admin. 

You can find the code here : 

```js
//~ Import module
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response, NextFunction } from 'express';


//~ Authentication
function auth(req:Request, res:Response, next: NextFunction):void {
  if (!req.user) throw new ErrorApi(`User not connected !`, req, res, 401);

  next();
}

function admin(req:Request, res:Response, next: NextFunction) {
    if (req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, you're not admin, go away !`, req, res, 403);
    next();
}

export { auth, admin };
```
We check first if the user sign in, if not we throw an error, and if he's not the admin, we throw an error too.

## Use the create function written in the project controller

After all of the control, you can access to the creation functionnality.

You can find below the code :

```js
//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Request, Response } from 'express';
import {baseConvertSvgByElement} from '../utils/baseConvertSvg.js';
//~ Import Datamapper
import { Project, User } from '../datamappers/index.js';

//~ Controller
async function createProject(req: Request, res: Response) {
  try {
    const isUser = req.user?.id;
    
    //~ User exist ?
    const userExist = await User.findOne(isUser);
    if (!userExist) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    if (isUser !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Is project created ?
    req.body = { ...req.body, user_id: isUser };
    const projectCreated = await Project.createWithCategories(req.body);

    if (!projectCreated) throw new ErrorApi(`No data found !`, req, res, 400);

    return res.status(201).json('Project successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
```
Check :

- If the user exist
- Add the id of the user to send it to the database

## Link with the database

Each data go through the data mapper which is a Data Access Layer that performs bidirectional transfer of data between a persistent data store (often a relational database) and an in memory data representation (the domain layer). 

The goal of the pattern is to keep the in memory representation and the persistent data store independent of each other and the data mapper itself. The layer is composed of one or more mappers (or Data Access Objects), performing the data transfer.




___
[Previous](./06_entrypoint.md) | [Home](../README.md) | [Next](./08_database.md)
