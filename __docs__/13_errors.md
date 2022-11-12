# ErrorHandler & ErrorLoggerHandling

Implementation of error management as well as the creation of a log file that is automatically generated when the API receives an error.

`Be careful first of all, you have to think about creating a log folder in the root`

---

## Creating the errorHandler file

Creation of an `ErrorApi` class which extends on the parent the generic Error constructor, which will allow us to automate and instantiate the errors encountered.

**Import**

```js
import { errorLoggerHandling } from '../../app/services/errorLoggerHandling.js';
import { Request, Response } from 'express';
```

**class ErrorApi**

```js
class ErrorApi extends Error {
  constructor(message: string, req: Request, res: Response, statusCode: number = 500) {
    super(message);
    res.status(statusCode).json({ message: message });

    //~ Log errors
    errorLoggerHandling(message, req, res);
  }
}

export { ErrorApi };
```

---

## Creating the formattedDate file

**/utils/formattedDate.js**

```js
//~ NEW DATE (Format)
const today = new Date();

const day = today.toLocaleString('en-EN', { day: 'numeric' });
const month = today.toLocaleString('en-EN', { month: 'numeric' });
const year = today.toLocaleString('en-EN', { year: 'numeric' });

const formattedDate = [year, month, day].join('-');

export { formattedDate };
```

---

## Creating the errorLoggerHandling file

**Import**

```js
//~ Import modules
import { formattedDate } from '../utils/formattedDate.js';
import { Request, Response } from 'express';
import * as fs from 'fs';

//~ Resolve __dirname
import { resolve, join } from 'path';
const __dirname = resolve(`./src/app/services`);
// resolve will define your root file

//~ Logger
import debug from 'debug';
const logger = debug('ErrorHandling');
```

**Function errorLoggerHandling - Manage error**

Creation of a function which allows to create a log file to generate the date and also its content which includes, date, time, path, and the error

```js
function errorLoggerHandling(message: string, req: Request, res: Response) {
  const actualDate = new Date();

  // format error message : Date + url + message
  // 00/00/0000 00:00:00 - /api/v1/{path} - "My error"
  const logMessage = `${actualDate.toLocaleString()} - ${req.url} - ${message}\r`;

  // date format YYYY-MONTH-DD
  const fileName = `${formattedDate}.log`;

  // create a log and write it in your file
  fs.appendFile(join(__dirname, `../../../logs/${fileName}`), logMessage, (error) => {
    if (error) logger(error);
  });
}

export { errorLoggerHandling };
```

---

## Example errorHandler in controller

**Example import**

```js
import { ErrorApi } from '../services/errorHandler.js';
```

**Examples of uses**

```js
//~ Guard Clauses
if (userId !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

//~ Error 404 NOT Found
app.use((req, res) => {
  throw new ErrorApi(`Page not found !`, req, res, 404);
});
```

---

## Final render

Example of file generated in the log folder:

`2022-9-13.log`

And its content:

```js
13/09/2022 08:44:58 - /favicon.ico - Page not found !
13/09/2022 09:59:24 - /api/v1/categories - No tokens found !
```

---

[Previous](./12_nodemailer.md) | [Home](../README.md) | [Next](./14_refactoring.md)
