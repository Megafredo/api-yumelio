//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Request, Response } from 'express';

//~ Controller
function createGoldenBookTicket(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
function fetchAllGoldenBookTickets(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

function updateGoldenBookTicket(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
function deleteGoldenBookTicket(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket };
