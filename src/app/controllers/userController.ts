//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Request, Response } from 'express';

function doSignUp(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function doSignIn(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function doSignOut(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function fetchAllUsers(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function fetchOneUser(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function updateUser(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function deleteUser(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { doSignUp, doSignIn, doSignOut, fetchAllUsers, fetchOneUser, updateUser, deleteUser };
