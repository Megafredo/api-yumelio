//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
import { User } from '../datamappers/index.js';
//~ Security
import bcrypt from 'bcrypt';
//~ Authorization
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';

//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');


//~Controllers
async function doSignUp(req: Request, res: Response) {
  try {
    let { email, password, passwordConfirm } = req.body;

        //~ User already exist ?
        const userExist = await User.findUser(email);

        if (userExist) throw new ErrorApi(`L'utilisateur existe déjà !`, req, res, 401);

        //~ Encrypt password if password exist
        if (password !== passwordConfirm) throw new ErrorApi(`Les mots de passe ne sont pas identiques`, req, res, 401);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        //replace password in body
        req.body.password = password;

        //~ Create user
        await User.create(req.body);
    return res.status(201).json(`L'utilisateur a bien été créé`);
    
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function doSignIn(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function doSignOut(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function fetchAllUsers(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function fetchOneUser(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { doSignUp, doSignIn, doSignOut, fetchAllUsers, fetchOneUser, updateUser, deleteUser };
