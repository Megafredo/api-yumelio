import jwt from 'jsonwebtoken';
import { ErrorApi } from '../../app/services/errorHandler.js';
import debug from 'debug';
const logger = debug('Jwt');
import { Request, Response, NextFunction } from 'express';

function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    //   get token from header
    const authHeader = req.headers['authorization'];

    if (authHeader === undefined) throw new ErrorApi('Aucun token trouvé', req, res, 400);

    //header contains token "Bearer <token>", split the string and get the 2nd part of the array
    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err: unknown, user : any ) => {
      if (err) {
        throw new ErrorApi('Le token est invalide !', req, res, 403);
      }
      req.user = user.user;

      req.session.token = accessToken;

      next();
    });
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { validateToken };
