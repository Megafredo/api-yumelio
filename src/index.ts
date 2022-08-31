//~ Dotenv
import 'dotenv/config';

//~ Import Express 
import express from 'express'; 
const app = express(); 
//& export for test JEST
export { app };

//~ Protect API Helmet
import helmet from 'helmet';
app.use(helmet());

//~ Import Debug 
import debug from 'debug'; 
const logger = debug('EntryPoint');