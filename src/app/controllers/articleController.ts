//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');

async function createArticle(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function fetchAllArticles(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function fetchOneArticle(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
async function updateArticle(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
async function deleteArticle(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { createArticle, fetchAllArticles, fetchOneArticle, updateArticle, deleteArticle };
