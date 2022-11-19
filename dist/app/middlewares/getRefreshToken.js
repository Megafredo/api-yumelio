import debug from 'debug';
const logger = debug('Jwt');
import { ErrorApi } from '../services/errorHandler.js';
import jwt from 'jsonwebtoken';
function getRefreshToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader === undefined)
            throw new ErrorApi('No token found !', req, res, 400);
        let refreshToken = authHeader.split(' ')[1];
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new ErrorApi('The token is invalid!', req, res, 403);
            }
            req.session.refreshToken = [];
            req.user = user.user;
            next();
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { getRefreshToken };
//# sourceMappingURL=getRefreshToken.js.map