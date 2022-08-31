//~ Import Debug 
import debug from 'debug'; 
const logger = debug('Jwt');

//~ Import modules
import jwt from 'jsonwebtoken';

import {ErrorApi} from './errorHandler.js';
import { Request, Response } from 'express';


//~  Jwt Access_Token
function generateAccessToken(user:object) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' }); // 1d => one day, 60m => 60 minutes
}
  
function generateRefreshToken(user:object, req:Request) {
    //* -- register refresh tokens
    req.session.refreshToken = [];
    const token = req.session.refreshToken;
    
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '20m' }); // 1d => one day, 60m => 60 minutes
    
    token.push(refreshToken);
  
    return refreshToken;
}

//~ Get refresh token
function getRefreshToken(req:Request, res:Response) {
    try {

      //get token from header
      const authHeader = req.headers['authorization'];
  
      if (authHeader === undefined) throw new ErrorApi('Aucun token trouvé', req, res, 400);
      
    //   header contains token "Bearer <token>", split the string and get the 2nd part of the array
      let refreshToken = authHeader.split(' ')[1];
      
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: unknown, user : any) => {
  
        if (err) {
          throw new ErrorApi('Le token est invalide !', req, res, 403);
        }
        // reset refresh token in session
        req.session.refreshToken = [];
        req.user = user.user;
 
        return refreshToken;
  
      });
    } catch (err) {
      if(err instanceof Error) logger(err.message);
    }
  }
  
//~  Jwt Refresh_Token
function refreshToken(req:Request, res:Response) {
    
    getRefreshToken(req, res);

  if (req.session.refreshToken?.length === 0) {
          
      const user = req.user;

      //delete old token and replace with new token
      const accessToken = generateAccessToken({ user });
      const refreshToken = generateRefreshToken({ user }, req);
  
      //generate a new accessToken and refreshToken
      return res.status(200).json({ accessToken, refreshToken });
    }

  }

  export {generateAccessToken, generateRefreshToken, refreshToken, getRefreshToken};