import { ErrorApi } from '../services/errorHandler.js';
import { coreController } from './coreController.js';
import debug from 'debug';
const logger = debug('Controller');
import { userModel, articleModel } from '../models/index.js';
const createArticle = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userExist = await userModel.fetchUser(req, res, userId);
        if (userId !== userExist.id)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        req.body = { ...req.body, user_id: userId };
        await articleModel.createItem(req, res);
        return res.status(201).json('Article successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllArticlesByUser = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        await userModel.fetchUser(req, res, userId);
        const articles = await articleModel.fetchAllItems(req, res, userId);
        return res.status(200).json(articles);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchOneArticleByUser = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        const articleId = await coreController.paramsHandler(req, res, 'articleId');
        await userModel.fetchUser(req, res, userId);
        const oneArticle = await articleModel.fetchOneItem(req, res, userId, articleId);
        return res.status(200).json(oneArticle);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateArticle = async (req, res) => {
    try {
        const userId = req.user?.id;
        const articleId = await coreController.paramsHandler(req, res, 'articleId');
        const user = await userModel.fetchUser(req, res, userId);
        await articleModel.fetchOneItem(req, res, userId, articleId);
        if (userId !== user.id && req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        req.body = { ...req.body, id: articleId, user_id: userId, };
        await articleModel.updateItem(req);
        return res.status(200).json(`Article successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteArticle = async (req, res) => {
    try {
        const userId = req.user?.id;
        const articleId = await coreController.paramsHandler(req, res, 'articleId');
        const user = await userModel.fetchUser(req, res, userId);
        await articleModel.fetchOneItem(req, res, userId, articleId);
        if (userId !== user.id && req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await articleModel.deleteItem(articleId);
        return res.status(200).json(`Article successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createArticle, fetchAllArticlesByUser, fetchOneArticleByUser, updateArticle, deleteArticle };
//# sourceMappingURL=articleController.js.map