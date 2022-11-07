//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
import { coreController } from './coreController.js';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { userModel, articleModel } from '../models/index.js';

//~ -------- Controllers
//& -------- createArticle
const createArticle = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Fetch if exist
    const userExist = await userModel.fetchUser(req, res, userId);

    //~ Guard Clauses
    if (userId !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Create article
    req.body = { ...req.body, user_id: userId };
    await articleModel.createItem(req, res);

    //~ Result
    return res.status(201).json('Article successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchAllArticlesByUser
const fetchAllArticlesByUser = async (req: Request, res: Response) => {
  try {
    //check don't forget to add the correct ID !!!!!!!!!!!!!!

    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');

    //~ Fetch if exist
    await userModel.fetchUser(req, res, userId);
    const articles = await articleModel.fetchAllItems(req, res, userId);

    //~ Result
    return res.status(200).json(articles);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchOneArticleByUser
const fetchOneArticleByUser = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');
    const articleId = await coreController.paramsHandler(req, res, 'articleId');

    //~ Fetch if exist
    await userModel.fetchUser(req, res, userId);
    const oneArticle = await articleModel.fetchOneItem(req, res, userId, articleId);

    //~ Result
    return res.status(200).json(oneArticle);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- updateArticle
const updateArticle = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    const articleId = await coreController.paramsHandler(req, res, 'articleId');

    //~ Fetch if exist
    const user = await userModel.fetchUser(req, res, userId);
    await articleModel.fetchOneItem(req, res, userId, articleId);

    //~ Guard Clauses
    if (userId !== user.id && req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Update article
    req.body = { ...req.body, id: articleId, user_id: userId, };
    await articleModel.updateItem(req);

    //~ Result
    return res.status(200).json(`Article successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteArticle
const deleteArticle = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    const articleId = await coreController.paramsHandler(req, res, 'articleId');

    //~ Fetch if exist
    const user = await userModel.fetchUser(req, res, userId);
    await articleModel.fetchOneItem(req, res, userId, articleId);

    //~ Guard Clauses
    if (userId !== user.id && req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Delete article
    await articleModel.deleteItem(articleId);

    //~ Result
    return res.status(200).json(`Article successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { createArticle, fetchAllArticlesByUser, fetchOneArticleByUser, updateArticle, deleteArticle };
