import debug from 'debug';
const logger = debug('Jwt');
import jwt from 'jsonwebtoken';
import { ErrorApi } from './errorHandler.js';
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
function generateRefreshToken(user, req) {
    req.session.refreshToken = [];
    const token = req.session.refreshToken;
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' });
    token.push(refreshToken);
    return refreshToken;
}
function getRefreshToken(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader === undefined)
            throw new ErrorApi('Aucun token trouvé', req, res, 400);
        let refreshToken = authHeader.split(' ')[1];
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new ErrorApi('Le token est invalide !', req, res, 403);
            }
            req.session.refreshToken = [];
            req.user = user.user;
            return refreshToken;
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
function refreshToken(req, res) {
    getRefreshToken(req, res);
    if (req.session.refreshToken?.length === 0) {
        const user = req.user;
        const accessToken = generateAccessToken({ user });
        const refreshToken = generateRefreshToken({ user }, req);
        return res.status(200).json({ accessToken, refreshToken });
    }
}
export { generateAccessToken, generateRefreshToken, refreshToken, getRefreshToken };
//# sourceMappingURL=jsonWebToken.js.map