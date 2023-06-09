//~ Dotenv
import 'dotenv/config';

//~ Import Express
import express, { Request, Response } from 'express';
const app = express();
//& export for test JEST
export { app };

//~ Import module
import { router } from './app/routes/index.js';
import { ErrorApi } from './app/services/errorHandler.js';

//~ Protect API Helmet
import helmet from 'helmet';
app.use(helmet());

//~ Import Debug
import debug from 'debug';
const logger = debug('EntryPoint');

//~ IMPORTATION SWAGGER DOCS
import { specs, serve, setup, cssOptions } from './app/swaggerDocs/swaggerDocs.js';
app.use('/api-docs', serve, setup(specs, cssOptions));

//~ Encoding parsing the body
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: false,
  })
);

//~ Cors
app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:6001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // Accept credentials (cookies) sent by the client

  // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
});

//If you have your node.js behind a proxy and are using secure: true, you need to set 'trust proxy' in express
app.set('trust proxy', 1);
// trust first proxy if deploy

//~ Session
import session from 'express-session';
app.use(
  session({
    // The default value is true, but using the default has been deprecated, as the default will change in the future
    saveUninitialized: false,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax', // or 'strict'
      maxAge: 24 * 60 * 60 * 1000, //24 hours
      expires: new Date(Date.now() + 60 * 60 * 1000), //1 hour
    },
  })
);

//~ Router
app.use(router);

//~ Error 404 NOT Found
app.use((req, res) => {
  throw new ErrorApi(`Page not found !`, req, res, 404);
});

//~ Launch Server
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT ?? 3000;

  app.listen(PORT, () => {
    logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
  });
}
