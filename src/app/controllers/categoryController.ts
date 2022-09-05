//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Request, Response } from 'express';
import { User } from '../datamappers/index.js';

//~ Controller
function createCategory(req: Request, res: Response) {
  try {
    
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

async function fetchAllCategories(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function updateCategory(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
function deleteCategory(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { createCategory, fetchAllCategories, updateCategory, deleteCategory };
