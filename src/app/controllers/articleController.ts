//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Datamapper
import { Article, User } from '../datamappers/index.js';

//~ Controllers
const createArticle = async (req: Request, res: Response) => {
  try {
    const isUser = req.user?.id;

    //~ User exist ?
    const userExist = await User.findOne(isUser);
    if (!userExist) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    if (isUser !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Is article created ?
    req.body = { ...req.body, user_id: isUser };

    const articleCreated = await Article.create(req.body);

    if (!articleCreated) throw new ErrorApi(`No data found !`, req, res, 400);

    return res.status(201).json('Article successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const fetchAllArticlesByUser = async (req: Request, res: Response) => {
  try {
    //check don't forget to add the correct ID !!!!!!!!!!!!!!

    //~ Is id a number ?
    const userId = +req.params.userId;
    if (isNaN(userId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ User exist ?
    const user = await User.findOne(userId);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    const articles = await Article.findAllByUser(userId);
    if (!articles) throw new ErrorApi(`No article found !`, req, res, 400);
    return res.status(200).json(articles);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const fetchOneArticleByUser = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const userId = +req.params.userId;
    if (isNaN(userId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ User exist ?
    const user = await User.findOne(userId);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    //~ Is id a number ?
    const articleId = +req.params.articleId;
    if (isNaN(articleId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ Article exist ?
    const oneArticle = await Article.findOneByUser(userId, articleId);
    if (!oneArticle) throw new ErrorApi(`No article found !`, req, res, 400);

    return res.status(200).json(oneArticle);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const updateArticle = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const isUser = req.user?.id;

    //~ User exist ?
    const user = await User.findOne(isUser);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    //~ Is id a number ?
    const articleId = +req.params.articleId;
    if (isNaN(articleId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ Article exist ?
    const oneArticle = await Article.findOneByUser(isUser, articleId);
    if (!oneArticle) throw new ErrorApi(`Article doesn't exist`, req, res, 400);

    if (isUser === user.id && req.user?.role === 'admin') {
      req.body = { ...req.body, user_id: isUser, id: articleId };
      await Article.update(req.body);
      res.status(200).json(`Article successfully updated !`);
    } else throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const isUser = req.user?.id;

    //~ User exist ?
    const user = await User.findOne(isUser);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    //~ Is id a number ?
    const articleId = +req.params.articleId;
    if (isNaN(articleId)) throw new ErrorApi(`Id must be a number`, req, res, 400);

    //~ article exist ?
    const article = await Article.findOneByUser(isUser, articleId);
    if (!article) throw new ErrorApi(`Article doesn't exist`, req, res, 400);

    if (isUser === user.id && req.user?.role === 'admin') {
      await Article.delete(articleId);
      return res.status(200).json(`Article successfully deleted`);
    } else throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { createArticle, fetchAllArticlesByUser, fetchOneArticleByUser, updateArticle, deleteArticle };
