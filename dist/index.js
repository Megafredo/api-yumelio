import 'dotenv/config';
import express from 'express';
const app = express();
export { app };
import { router } from './app/routes/index.js';
import { ErrorApi } from './app/services/errorHandler.js';
import helmet from 'helmet';
app.use(helmet());
import debug from 'debug';
const logger = debug('EntryPoint');
import { specs, serve, setup, cssOptions } from './app/swaggerDocs/swaggerDocs.js';
app.use('/api-docs', serve, setup(specs, cssOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
    next();
});
app.set('trust proxy', 1);
import session from 'express-session';
app.use(session({
    saveUninitialized: true,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(router);
app.use((req, res) => {
    throw new ErrorApi(`Page not found !`, req, res, 404);
});
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
        logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
    });
}
//# sourceMappingURL=index.js.map