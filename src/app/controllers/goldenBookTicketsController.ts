//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
import { coreController } from './coreController.js';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { userModel, goldenBookModel } from '../models/index.js';

//~ -------- Controller
//& -------- createGoldenBookTicket
const createGoldenBookTicket = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Fetch if exist
    const userExist = await userModel.fetchUser(req, res, userId);

    //~ Guard Clauses
    if (userId !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Create goldenBookTicket
    req.body = { ...req.body, user_id: userId };
    await goldenBookModel.createItem(req, res);

    //~ Result
    return res.status(201).json('Golden book ticket successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchAllGoldenBookTickets
const fetchAllGoldenBookTickets = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Fetch if exist
    await userModel.fetchUser(req, res, userId);
    const goldenBookTicket = await goldenBookModel.fetchAllItems(req, res);

    //~ Result
    return res.status(200).json(goldenBookTicket);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- updateGoldenBookTicket
const updateGoldenBookTicket = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    const gbTicketId = await coreController.paramsHandler(req, res, 'gbTicketId');

    //~ Fetch if exist
    const user = await userModel.fetchUser(req, res, userId);
    await goldenBookModel.fetchOneItem(req, res, userId, gbTicketId);

    //~ Guard Clauses
    if (userId !== user.id) throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Update GoldenBookTicket
    req.body = { ...req.body, user_id: userId, id: gbTicketId };
    await goldenBookModel.updateItem(req);

    //~ Result
    res.status(200).json(`GoldenBookTicket successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteGoldenBookTicket
const deleteGoldenBookTicket = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    const gbTicketId = await coreController.paramsHandler(req, res, 'gbTicketId');

    //~ Fetch if exist
    const user = await userModel.fetchUser(req, res, userId);
    await goldenBookModel.fetchOneItem(req, res, userId, gbTicketId);

    //~ Guard Clauses
    if (userId !== user.id && req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Delete GoldenBookTicket
    await goldenBookModel.deleteItem(gbTicketId);

    //~ Result
    return res.status(200).json(`GoldenBookTicket successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket };
