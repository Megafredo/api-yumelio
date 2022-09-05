import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Article, User } from '../datamappers/index.js';
async function createArticle(req, res) {
    try {
        const { user_id } = req.body;
        if (isNaN(user_id))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const userExist = await User.findOne(user_id);
        if (!userExist)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        if (req.user?.id !== userExist.id)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        const articleCreated = await Article.create(req.body);
        if (!articleCreated)
            throw new ErrorApi(`No data found !`, req, res, 400);
        return res.status(201).json('Article successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function fetchAllArticlesByUser(req, res) {
    try {
        const userId = +req.params.userId;
        if (isNaN(userId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const user = await User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const articles = await Article.findAllByUser(userId);
        if (!articles)
            throw new ErrorApi(`No article found !`, req, res, 400);
        return res.status(200).json(articles);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function fetchOneArticleByUser(req, res) {
    try {
        const userId = +req.params.userId;
        if (isNaN(userId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const user = await User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const articleId = +req.params.articleId;
        if (isNaN(articleId))
            throw new ErrorApi(`L'id doit être un nombre`, req, res, 400);
        const oneArticle = await Article.findOneByUser(userId, articleId);
        if (!oneArticle)
            throw new ErrorApi(`No article found !`, req, res, 400);
        return res.status(200).json(oneArticle);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function updateArticle(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function deleteArticle(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { createArticle, fetchAllArticlesByUser, fetchOneArticleByUser, updateArticle, deleteArticle };
//# sourceMappingURL=articleController.js.map