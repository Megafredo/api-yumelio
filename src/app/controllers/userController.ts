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

    if (userExist) throw new ErrorApi(`User already exist !`, req, res, 401);

    //~ Encrypt password if password exist
    if (password !== passwordConfirm) throw new ErrorApi(`Not the same password`, req, res, 401);
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //replace password in body
    req.body.password = password;

    //~ Create user
    await User.create(req.body);
    return res.status(201).json(`User successfully created !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function doSignIn(req: Request, res: Response) {
  try {
    let { email, password } = req.body;

    //~ User already exist ?
    const userExist = await User.findUser(email);

    if (!userExist) throw new ErrorApi(`User unknown !`, req, res, 401);

    //~ Security
    const validPwd = await bcrypt.compare(password, userExist.password);

    if (!validPwd) throw new ErrorApi(`Email or password not valid !`, req, res, 401);

    const { ['password']: remove, ...user } = userExist;

    //~ Authorization JWT
    let accessToken = generateAccessToken({ user });
    let refreshToken = generateRefreshToken({ user }, req);

    let userIdentity = { ...user, accessToken, refreshToken };

    return res.status(200).json(userIdentity);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function doSignOut(req: Request, res: Response) {
  try {

    req.user = null;
    req.session.destroy();

    return res.status(204).json(`User disconnected !`);
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
