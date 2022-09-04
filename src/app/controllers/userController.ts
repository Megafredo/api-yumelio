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
    const userExist = await User.findUserIdentity(email);

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
    const userExist = await User.findUserIdentity(email);

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

// async function fetchAllUsers(req: Request, res: Response) {
//   try {
//     const users = await User.findAll();

//     if (!users) throw new ErrorApi(`No user found !`, req, res, 400);

//     return res.status(200).json(users);
//   } catch (err) {
//     if (err instanceof Error) logger(err.message);
//   }
// }

async function fetchOneUser(req: Request, res: Response) {
  try {
    const userId = +req.params.userId;
    if (isNaN(userId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    const user = await User.findOne(userId);

    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    let { password, passwordConfirm } = req.body;

    //~ Is id a number ?
    const userId = +req.params.userId;
    if (isNaN(userId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ User exist ?
    const user = await User.findOne(userId);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    //~ User already exist ?
    const userExist = await User.findUserIdentity(req.body.email);
    if (userExist) throw new ErrorApi(`Email already exist !`, req, res, 401);

    //~ Encrypt password if password exist
    if (password) {
      if (password !== passwordConfirm) throw new ErrorApi(`Not the same password !`, req, res, 401);

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      // replace password in body
      req.body.password = password;
    }

    if (req.user?.id !== userId) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    req.body = { ...req.body, id: userId };

    //~ Update user
    await User.update(req.body);

    return res.status(200).json(`Informations successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    //~ Is id a number ?
    const userId = +req.params.userId;
    if (isNaN(userId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ User exist ?
    const user = await User.findOne(userId);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    console.log(req.user)

    const isUser = req.user?.id;
    //only the user that want to access his info can or admin
    if (isUser === userId || req.user?.role === 'admin') {
      await User.delete(userId);

      console.log("-----------------------------");
      console.log("req.user: ", req.user);
      console.log("req.session: ", req.session);
      console.log("-----------------------------");
      req.user = null;
      req.session.destroy();
      console.log("req.user: ", req.user);
      console.log("req.session: ", req.session);
      console.log("-----------------------------");
  
      return res.status(200).json(`User successfully deleted`);
  }
    else throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
   
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser };
