import jwt from 'jsonwebtoken';
import { ErrorApi } from '../../app/services/errorHandler.js';
import debug from 'debug';
const logger = debug('Jwt');
function validateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader === undefined)
            throw new ErrorApi('Aucun token trouvé', req, res, 400);
        const accessToken = authHeader.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new ErrorApi('Le token est invalide !', req, res, 403);
            }
            req.user = user.user;
            req.session.token = accessToken;
            next();
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { validateToken };
//# sourceMappingURL=validateToken.js.map