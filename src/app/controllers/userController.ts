//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
import { sendEmail } from '../services/nodemailerAuto.js';
import { coreController } from './coreController.js';
//~ Security
import bcrypt from 'bcrypt';
//~ Authorization
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { userModel } from '../models/index.js';

//~ -------- Controllers
//& -------- doSignUp
const doSignUp = async (req: Request, res: Response) => {
  try {
    let { email, password, passwordConfirm } = req.body;

    //~ email already exist ?
    await userModel.checkEmail(req, res, email);

    //~ Encrypt password if password exist
    if (password !== passwordConfirm) throw new ErrorApi(`Not the same password`, req, res, 401);

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //replace password in body
    req.body.password = password;

    //~ Create user
    await userModel.createItem(req, res);

    //~ Send an email to confirm creation
    await sendEmail.toUser(email, 'subscribe');

    //~ Result
    return res.status(201).json(`User successfully created !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- doSignIn
const doSignIn = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    //~ email already exist ?
    const userExist = await userModel.fetchEmail(req, res, email);

    //~ Security
    const validPwd = await bcrypt.compare(password, userExist.password);
    if (!validPwd) throw new ErrorApi(`Email or password not valid !`, req, res, 401);

    const { ['password']: remove, ...user } = userExist;

    //~ Authorization JWT
    let accessToken = generateAccessToken({ user });
    let refreshToken = generateRefreshToken({ user }, req);
    let userIdentity = { ...user, accessToken, refreshToken };

    //~ Result
    return res.status(200).json(userIdentity);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- doSignOut
const doSignOut = async (req: Request, res: Response) => {
  try {
    req.user = null;
    req.session.destroy();

    //~ Result
    return res.status(204).json(`User disconnected !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchOneUser
const fetchOneUser = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');

    //~ fetch if exist
    const user = await userModel.fetchUser(req, res, userId);

    //~ Delete password display
    delete user['password'];

    //~ Result
    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- updateUser
const updateUser = async (req: Request, res: Response) => {
  try {
    let { email, password, passwordConfirm } = req.body;

    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');

    //~ fetch if exist
    await userModel.fetchUser(req, res, userId);

    //~ check email if exist ?
    await userModel.checkEmail(req, res, email);

    //~ Encrypt password if password exist
    if (password) {
      if (password !== passwordConfirm) throw new ErrorApi(`Not the same password !`, req, res, 401);

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      // replace password in body
      req.body.password = password;
    }

    //~ Guard Clauses
    if (req.user?.id !== userId) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Update user
    req.body = { ...req.body, id: userId };
    await userModel.updateItem(req);

    //~ Result
    return res.status(200).json(`Informations successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteUser
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    await coreController.paramsHandler(req, res, 'userId');

    //~ User exist ?
    const user = await userModel.fetchUser(req, res, userId);

    //~ Guard Clauses
    // only the user that want to access his info can or admin
    if (userId === user.id || req.user?.role === 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Delete User
    await userModel.deleteItem(userId);

    //~ Clean user session
    req.user = null;
    req.session.destroy();

    //~ Send an email to confirm creation
    await sendEmail.toUser(user.email, 'unsubscribe');

    //~ Result
    return res.status(200).json(`User successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser };

